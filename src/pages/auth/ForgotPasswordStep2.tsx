import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';
const OTP_LEN = 6;
const OTP_TTL = 5 * 60; // detik
const RESEND_COOLDOWN = 60;

export default function ForgotPasswordStep2() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const email: string = location.state?.email || sessionStorage.getItem('reset_email') || '';
  const [digits, setDigits] = useState<string[]>(Array(OTP_LEN).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [remain, setRemain] = useState(OTP_TTL);
  const [cooldown, setCooldown] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) navigate('/lupa-password');
  }, [email, navigate]);

  useEffect(() => {
    const t = setInterval(() => setRemain((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const otp = digits.join('');
  const mm = String(Math.floor(remain / 60)).padStart(2, '0');
  const ss = String(remain % 60).padStart(2, '0');

  const handleChange = (idx: number, val: string) => {
    const v = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[idx] = v;
    setDigits(next);
    if (v && idx < OTP_LEN - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LEN);
    if (!text) return;
    e.preventDefault();
    const next = Array(OTP_LEN).fill('');
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    const last = Math.min(text.length, OTP_LEN - 1);
    inputsRef.current[last]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < OTP_LEN - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Gagal mengirim ulang OTP');
      toast.success('Kode OTP baru telah dikirim');
      setRemain(OTP_TTL);
      setCooldown(RESEND_COOLDOWN);
      setDigits(Array(OTP_LEN).fill(''));
      inputsRef.current[0]?.focus();
    } catch (err: any) {
      const msg = err.message?.includes('Failed to fetch')
        ? 'Tidak dapat terhubung ke server'
        : err.message;
      // jika 429 cooldown dari server, set cooldown dari pesan
      const m = msg?.match(/(\d+)\s*detik/);
      if (m) setCooldown(Number(m[1]));
      toast.error(msg || 'Gagal mengirim ulang');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== OTP_LEN) {
      toast.error('Masukkan 6 digit kode OTP');
      return;
    }
    if (remain <= 0) {
      toast.error('Kode OTP kedaluwarsa. Silakan kirim ulang.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Kode OTP tidak valid');
      sessionStorage.setItem('reset_token', data.resetToken);
      sessionStorage.setItem('reset_email', email);
      toast.success('Kode valid. Silakan buat kata sandi baru.');
      navigate('/lupa-password/reset', { state: { email } });
    } catch (err: any) {
      toast.error(err.message || 'Verifikasi gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate('/lupa-password')}
          className="flex items-center gap-2 mb-6 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-slate-400">LANGKAH 2 DARI 3</span>
          <span className="h-1 flex-1 rounded bg-slate-100"><span className="block h-1 w-2/3 rounded bg-blue-900" /></span>
        </div>
        <div className="mb-2 mt-3">
          <h2 className="text-2xl font-bold text-slate-900">Masukkan Kode OTP</h2>
          <p className="text-sm text-slate-500 mt-1">
            Kode 6 digit telah dikirim ke <b className="text-slate-700">{email}</b>. Cek inbox/spam.
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between text-xs">
          <span className={remain <= 60 ? 'text-red-600 font-semibold' : 'text-slate-500'}>
            Sisa waktu: {mm}:{ss} {remain <= 0 && '(kedaluwarsa)'}
          </span>
          <span className="text-slate-400">5 menit</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" onPaste={handlePaste}>
          <div className="flex gap-2 justify-between">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el; }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-11 h-12 text-center text-lg font-bold rounded-xl outline outline-1 outline-slate-200 focus:outline-primary bg-white"
                maxLength={1}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== OTP_LEN}
            className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold transition disabled:opacity-50"
          >
            {isLoading ? 'Memverifikasi...' : 'Verifikasi Kode'}
          </button>

          <div className="text-center text-sm">
            <span className="text-slate-500">Tidak menerima kode? </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className="font-semibold text-blue-900 hover:underline disabled:text-slate-400 disabled:no-underline"
            >
              {cooldown > 0 ? `Kirim ulang (${cooldown}s)` : 'Kirim ulang'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
