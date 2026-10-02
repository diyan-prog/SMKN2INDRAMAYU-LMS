import bcrypt from 'bcrypt';

// Penyimpanan sementara in-memory. Bungkus 1 modul agar mudah ganti MySQL/Redis nanti.
const otpMap = new Map(); // email -> { hash, expiresAt, attempts, cooldownUntil }
const tokenMap = new Map(); // resetToken -> { uid, email, expiresAt }

const OTP_TTL_MS = 5 * 60 * 1000;
const TOKEN_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function setOtp(email, otp) {
  const hash = await bcrypt.hash(otp, 10);
  otpMap.set(email.toLowerCase(), {
    hash,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
    cooldownUntil: Date.now() + RESEND_COOLDOWN_MS,
  });
}

export function getOtp(email) {
  return otpMap.get(email.toLowerCase()) || null;
}

export function checkCooldown(email) {
  const rec = getOtp(email);
  if (!rec) return 0;
  const remain = Math.ceil((rec.cooldownUntil - Date.now()) / 1000);
  return remain > 0 ? remain : 0;
}

export async function verifyOtp(email, otp) {
  const rec = getOtp(email);
  if (!rec) return { ok: false, reason: 'Kode OTP tidak ditemukan. Silakan kirim ulang.' };
  if (Date.now() > rec.expiresAt) {
    otpMap.delete(email.toLowerCase());
    return { ok: false, reason: 'Kode OTP kedaluwarsa. Silakan kirim ulang.' };
  }
  if (rec.attempts >= MAX_ATTEMPTS) {
    otpMap.delete(email.toLowerCase());
    return { ok: false, reason: 'Melebihi batas percobaan. Silakan kirim OTP baru.' };
  }
  const match = await bcrypt.compare(otp, rec.hash);
  if (!match) {
    rec.attempts += 1;
    if (rec.attempts >= MAX_ATTEMPTS) {
      otpMap.delete(email.toLowerCase());
      return { ok: false, reason: 'Kode OTP salah. Batas percobaan tercapai, kirim OTP baru.' };
    }
    return { ok: false, reason: `Kode OTP salah. Sisa percobaan: ${MAX_ATTEMPTS - rec.attempts}` };
  }
  return { ok: true };
}

export function clearOtp(email) {
  otpMap.delete(email.toLowerCase());
}

export function issueResetToken(uid, email) {
  const token = globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
  tokenMap.set(token, { uid, email: email.toLowerCase(), expiresAt: Date.now() + TOKEN_TTL_MS });
  return token;
}

export function consumeResetToken(token) {
  const rec = tokenMap.get(token);
  if (!rec) return null;
  if (Date.now() > rec.expiresAt) {
    tokenMap.delete(token);
    return null;
  }
  tokenMap.delete(token);
  return rec;
}

// Bersihkan entri kedaluwarsa tiap menit
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of otpMap) if (now > v.expiresAt && now > v.cooldownUntil) otpMap.delete(k);
  for (const [k, v] of tokenMap) if (now > v.expiresAt) tokenMap.delete(k);
}, 60_000).unref?.();
