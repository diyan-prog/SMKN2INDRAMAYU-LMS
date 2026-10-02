import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import admin from 'firebase-admin';
import { generateOtp, setOtp, getOtp, checkCooldown, verifyOtp, clearOtp, issueResetToken, consumeResetToken } from './otpStore.js';
import { sendOtpEmail } from './mailer.js';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// Firebase Admin — jangan exit, biar /api/health tetap jalan & pesan error jelas di endpoint
let adminReady = false;
let adminInitError = null;
function initFirebaseAdmin() {
  if (admin.apps.length) { adminReady = true; return; }
  const jsonEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT || './serviceAccountKey.json';
  let cred = null;
  try {
    if (jsonEnv && jsonEnv.trim()) {
      cred = JSON.parse(jsonEnv);
    } else if (fs.existsSync(filePath)) {
      cred = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
      adminInitError = 'FIREBASE_SERVICE_ACCOUNT tidak ditemukan. Buat server/serviceAccountKey.json (Firebase Console > Project Settings > Service accounts > Generate new private key) atau isi FIREBASE_SERVICE_ACCOUNT_JSON di server/.env';
      console.error('[admin]', adminInitError);
      return;
    }
    admin.initializeApp({ credential: admin.credential.cert(cred) });
    adminReady = true;
    console.log('[admin] Firebase Admin siap');
  } catch (e) {
    adminInitError = e.message;
    console.error('[admin] init gagal:', e.message);
  }
}
initFirebaseAdmin();

function requireAdmin(req, res, next) {
  if (adminReady) return next();
  return res.status(500).json({
    message: 'Konfigurasi Firebase Admin belum lengkap di server.',
    detail: adminInitError,
    hint: 'Buat server/serviceAccountKey.json atau isi FIREBASE_SERVICE_ACCOUNT_JSON. Lihat server/.env.example',
  });
}

app.use(express.json());
app.use(cors({
  origin: (origin, cb) => {
    // Izinkan tanpa origin (curl/postman) & origin yang cocok
    const allowed = FRONTEND_ORIGIN.split(',').map(s => s.trim()).filter(Boolean);
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin} tidak diizinkan`));
  },
  credentials: false,
}));

// Rate limit per IP (khusus endpoint OTP)
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Terlalu banyak permintaan. Coba lagi nanti.' },
});

app.get('/api/health', (_req, res) => res.json({ ok: true, adminReady, adminInitError: adminInitError || null }));

const GENERIC_OTP_RESPONSE = { message: 'Jika email terdaftar, kode OTP telah dikirim. Silakan cek inbox/spam.' };

app.post('/api/auth/send-otp', requireAdmin, otpLimiter, async (req, res) => {
  const rawEmail = (req.body?.email || '').toString().trim().toLowerCase();
  if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
    return res.status(400).json({ message: 'Format email tidak valid.' });
  }

  const remain = checkCooldown(rawEmail);
  if (remain > 0) {
    return res.status(429).json({ message: `Tunggu ${remain} detik sebelum kirim ulang.` });
  }

  // Cek user ada di Firebase; respons tetap generik agar tidak bocor enumerasi email
  let userExists = false;
  try {
    await admin.auth().getUserByEmail(rawEmail);
    userExists = true;
  } catch (e) {
    // Auth tidak ditemukan → tetap respons generik
    if (e.code !== 'auth/user-not-found') {
      console.error('[send-otp] getUserByEmail error:', e);
    }
  }

  if (!userExists) {
    return res.json(GENERIC_OTP_RESPONSE);
  }

  const otp = generateOtp();
  try {
    await setOtp(rawEmail, otp);
    await sendOtpEmail(rawEmail, otp);
    // Jangan log OTP di console (hapus log OTP lama)
    console.log(`[send-otp] OTP terkirim ke ${rawEmail}`);
    return res.json(GENERIC_OTP_RESPONSE);
  } catch (e) {
    console.error('[send-otp] gagal kirim email:', e);
    // Jangan bocorkan detail SMTP ke client, tapi kirim pesan ramah
    const msg = e.message?.includes('SMTP') || e.message?.includes('konek SMTP')
      ? 'Gagal mengirim email OTP. Periksa konfigurasi SMTP di server.'
      : 'Gagal mengirim OTP. Coba lagi nanti.';
    return res.status(500).json({ message: msg, detail: process.env.NODE_ENV !== 'production' ? e.message : undefined });
  }
});

app.post('/api/auth/verify-otp', requireAdmin, otpLimiter, async (req, res) => {
  const email = (req.body?.email || '').toString().trim().toLowerCase();
  const otp = (req.body?.otp || '').toString().trim();
  if (!email || !otp) return res.status(400).json({ message: 'Email dan kode OTP wajib diisi.' });
  if (!/^\d{6}$/.test(otp)) return res.status(400).json({ message: 'Kode OTP harus 6 digit angka.' });

  const rec = getOtp(email);
  if (!rec) return res.status(400).json({ message: 'Kode OTP tidak ditemukan. Silakan kirim ulang.' });

  const v = await verifyOtp(email, otp);
  if (!v.ok) return res.status(400).json({ message: v.reason });

  // Valid → buat resetToken sekali pakai 10 menit
  let uid = null;
  try {
    const user = await admin.auth().getUserByEmail(email);
    uid = user.uid;
  } catch (e) {
    return res.status(400).json({ message: 'Akun tidak ditemukan.' });
  }
  clearOtp(email);
  const resetToken = issueResetToken(uid, email);
  return res.json({ resetToken, message: 'OTP valid. Silakan buat kata sandi baru.' });
});

app.post('/api/auth/reset-password', requireAdmin, otpLimiter, async (req, res) => {
  const resetToken = (req.body?.resetToken || '').toString().trim();
  const password = (req.body?.password || '').toString();
  if (!resetToken || !password) return res.status(400).json({ message: 'Token dan kata sandi wajib diisi.' });
  if (password.length < 8) return res.status(400).json({ message: 'Kata sandi minimal 8 karakter.' });

  const rec = consumeResetToken(resetToken);
  if (!rec) return res.status(400).json({ message: 'Token tidak valid atau kedaluwarsa. Ulangi proses lupa kata sandi.' });

  try {
    await admin.auth().updateUser(rec.uid, { password });
    return res.json({ message: 'Kata sandi berhasil diganti. Silakan login dengan kata sandi baru.' });
  } catch (e) {
    console.error('[reset-password] updateUser error:', e);
    return res.status(500).json({ message: 'Gagal mengganti kata sandi. Coba lagi.' });
  }
});

// Error handler CORS / umum
app.use((err, _req, res, _next) => {
  if (err) return res.status(403).json({ message: err.message || 'Ditolak.' });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}  (FRONTEND_ORIGIN=${FRONTEND_ORIGIN})`);
});
