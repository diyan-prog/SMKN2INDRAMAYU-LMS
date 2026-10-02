import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

export default function ForgotPasswordStep3() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const email = location.state?.email || sessionStorage.getItem('reset_email') || '';
  const resetToken = sessionStorage.getItem('reset_token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!resetToken) {
      toast.error('Sesi reset tidak valid. Ulangi dari awal.');
      navigate('/lupa-password');
    }
  }, [resetToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Kata sandi minimal 8 karakter');
      return;
    }
    if (password !== confirm) {
      toast.error('Konfirmasi kata sandi tidak cocok');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Gagal mengganti kata sandi');
      sessionStorage.removeItem('reset_token');
      sessionStorage.removeItem('reset_email');
      toast.success(data.message || 'Kata sandi berhasil diganti. Silakan login.');
      navigate('/login');
    } catch (err: any) {
      const msg = err.message?.includes('Failed to fetch')
        ? 'Tidak dapat terhubung ke server'
        : err.message;
      toast.error(msg || 'Gagal mengganti kata sandi');
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
          <span className="text-xs font-bold tracking-widest text-slate-400">LANGKAH 3 DARI 3</span>
          <span className="h-1 flex-1 rounded bg-slate-100"><span className="block h-1 w-full rounded bg-blue-900" /></span>
        </div>
        <div className="mb-6 mt-3">
          <h2 className="text-2xl font-bold text-slate-900">Buat Kata Sandi Baru</h2>
          <p className="text-sm text-slate-500 mt-1">
            Untuk <b className="text-slate-700">{email}</b> — minimal 8 karakter.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Kata Sandi Baru</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl outline outline-1 outline-slate-200 focus:outline-primary text-sm"
                required
                minLength={8}
              />
              <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Konfirmasi Kata Sandi</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={show ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl outline outline-1 outline-slate-200 focus:outline-primary text-sm"
                required
                minLength={8}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold transition disabled:opacity-50"
          >
            {isLoading ? 'Menyimpan...' : 'Ganti Kata Sandi'}
          </button>
        </form>
      </div>
    </div>
  );
}
