import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

export default function ForgotPasswordStep1() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      toast.error('Format email tidak valid');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Gagal mengirim kode OTP');
      toast.success(data.message || 'Jika email terdaftar, kode OTP telah dikirim. Cek inbox/spam.');
      sessionStorage.setItem('reset_email', v);
      navigate('/lupa-password/verifikasi', { state: { email: v } });
    } catch (err: any) {
      const msg = err.message?.includes('Failed to fetch')
        ? 'Tidak dapat terhubung ke server. Pastikan backend berjalan.'
        : err.message;
      toast.error(msg || 'Gagal mengirim kode OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 mb-6 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} /> Kembali ke Login
        </button>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-slate-400">LANGKAH 1 DARI 3</span>
          <span className="h-1 flex-1 rounded bg-slate-100"><span className="block h-1 w-1/3 rounded bg-blue-900" /></span>
        </div>
        <div className="mb-8 mt-3">
          <h2 className="text-2xl font-bold text-slate-900">Lupa Kata Sandi</h2>
          <p className="text-sm text-slate-500 mt-1">
            Masukkan email akun. Kami kirim kode OTP 6 digit (berlaku 5 menit).
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Alamat Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sekolah.sch.id"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white rounded-xl outline outline-1 outline-slate-200 focus:outline-primary text-sm placeholder:text-slate-400"
                required
                autoComplete="email"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold transition disabled:opacity-50"
          >
            {isLoading ? 'Mengirim...' : 'Kirim Kode OTP'}
          </button>
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Respons selalu sama demi keamanan — jika email terdaftar, OTP akan masuk inbox/spam.
          </p>
        </form>
      </div>
    </div>
  );
}
