import nodemailer from 'nodemailer';

let transporter = null;

export function getTransporter() {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  if (!user || !pass) throw new Error('SMTP_USER / SMTP_PASS belum diisi di server/.env (pakai Google App Password)');
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

export async function sendOtpEmail(to, otp) {
  const from = process.env.SMTP_USER;
  const tx = getTransporter();
  // Verifikasi koneksi sekali
  await tx.verify().catch((e) => {
    throw new Error(`Gagal konek SMTP: ${e.message}. Cek SMTP_HOST/PORT/USER/PASS & App Password.`);
  });
  const info = await tx.sendMail({
    from: `"SMKN 2 Indramayu" <${from}>`,
    to,
    subject: 'Kode OTP Reset Kata Sandi - SMKN 2 Indramayu',
    text: `Kode OTP Anda: ${otp}\nBerlaku 5 menit. Jangan bagikan kode ini.\n`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <div style="background:#1e3a8a;color:#fff;padding:16px 20px"><b>SMK Negeri 2 Indramayu</b> — Reset Kata Sandi</div>
        <div style="padding:20px">
          <p>Kode OTP Anda:</p>
          <div style="font-size:28px;letter-spacing:8px;font-weight:800;text-align:center;background:#f1f5f9;padding:12px;border-radius:8px">${otp}</div>
          <p style="color:#64748b;font-size:13px">Berlaku <b>5 menit</b>. Jangan bagikan kode ini. Jika bukan Anda, abaikan email ini.</p>
        </div>
      </div>
    `,
  });
  return info;
}
