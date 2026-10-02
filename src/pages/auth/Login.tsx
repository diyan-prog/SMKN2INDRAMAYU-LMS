import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await loginWithEmail(data.username, data.password);
      toast.success('Login berhasil');
    } catch (err: any) {
      toast.error(err.message || 'Gagal masuk');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Login Google berhasil');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex items-center justify-center p-2 overflow-hidden">
      <div className="w-full max-w-[1050px] h-[640px] max-h-[96vh] bg-white rounded-2xl shadow-xl overflow-hidden flex">
        
        {/* Left Side - Illustration */}
        <div className="w-[480px] hidden lg:flex flex-col justify-between p-10 bg-white border-r border-slate-100 relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 opacity-10 bg-gradient-radial from-primary/20 to-transparent" />
          <div className="absolute w-56 h-56 -left-16 -top-16 bg-blue-50/70 rounded-full blur-3xl" />
          <div className="absolute w-64 h-64 right-0 top-1/3 bg-teal-100/60 rounded-full blur-[64px]" />
          <div className="absolute w-48 h-48 left-10 bottom-24 bg-blue-100/50 rounded-full blur-3xl" />
          
          {/* Decorative Dots */}
          <div className="absolute w-6 h-6 right-16 top-12 rounded-full border-2 border-primary/40" />
          <div className="absolute w-3 h-3 left-8 top-1/2 bg-blue-900/30 rounded-full" />
          <div className="absolute w-4 h-4 right-20 bottom-24 bg-primary/50 rounded-full" />
          <div className="absolute w-8 h-8 left-1/2 top-28 rounded-full border border-blue-900/30" />

          <div className="relative z-10 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-100/80 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-primary text-xs font-semibold uppercase tracking-wide">
                LMS RESMI SMK NEGERI 2 INDRAMAYU
              </span>
            </div>
            <div className="pt-1">
              <h1 className="text-4xl font-bold leading-tight">
                <span className="text-slate-900">Permudah Interaksi Anda &<br/></span>
                <span className="text-blue-900">Siswa secara Online</span>
              </h1>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed pt-1">
              Satu portal pintar untuk monitoring kelas, ujian online, penugasan<br/>
              terpadu, dan kolaborasi tanpa hambatan.
            </p>
          </div>

          {/* Illustration Card */}
          <div className="relative z-10 py-6">
            <div className="relative">
              <div className="bg-slate-100 rounded-2xl shadow-lg outline outline-4 outline-white overflow-hidden">
                <img 
                  src="/login.jpeg" 
                  alt="SMK Negeri 2 Indramayu" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-md flex items-center gap-1.5">
                    <div className="w-3.5 h-2.5 bg-amber-300" />
                    <span className="text-white text-xs font-medium">SMK Negeri 2 Indramayu</span>
                  </div>
                  <div className="px-2 py-0.5 bg-primary/90 rounded-sm">
                    <span className="text-white text-xs font-semibold">Online 1.2k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="relative z-10 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-primary" />
              <span className="text-slate-500">Tersinkronisasi Dapodik & Kemdikbud</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-slate-700 font-semibold">4.9/5</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center px-0 lg:px-10">
            <div className="w-full max-w-md space-y-7">
              {/* Header */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <img src="/SMK_Negeri_2_Indramayu.png" alt="Logo SMK Negeri 2 Indramayu" className="w-16 h-16 object-contain" />
                  <span className="px-2 py-0.5 rounded-full outline outline-1 outline-gray-200 text-xs font-medium">
                    LMS V2.4
                  </span>
                </div>
                <div className="pt-2.5 space-y-1">
                  <h2 className="text-2xl font-bold text-slate-900">SMK Negeri 2 Indramayu</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Masuk ke akun portal akademik Anda untuk melanjutkan pembelajaran.
                  </p>
                </div>
              </div>

              {/* SSO Buttons */}
              <div className="flex gap-3.5">
                <button className="flex-1 px-4 py-2.5 rounded-xl outline outline-1 outline-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2.5">
                  <div className="w-6 h-6 bg-blue-100/70 rounded-lg flex items-center justify-center">
                    <div className="w-3.5 h-2.5 bg-blue-900 rounded" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Siakad</span>
                </button>
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex-1 px-4 py-2.5 rounded-xl outline outline-1 outline-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-slate-700">Google</span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-slate-200" />
                <span className="px-3 text-xs font-medium text-slate-400 uppercase tracking-wide">ATAU</span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Alamat Email / NISN / NIP
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      {...register('username')}
                      type="text"
                      placeholder="nama@sekolah.sch.id atau NISN"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white rounded-xl outline outline-1 outline-slate-200 focus:outline-primary text-sm placeholder:text-slate-400"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-xs text-red-600">{errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-700">Kata Sandi</label>
                    <Link to="/lupa-password" className="text-xs font-semibold text-blue-900 hover:underline">
                      Lupa kata sandi?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl outline outline-1 outline-slate-200 focus:outline-primary text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center pt-1">
                  <input
                    {...register('remember')}
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-neutral-500 text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember" className="ml-2 text-xs text-slate-600">
                    Ingat saya di perangkat ini
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm font-semibold transition disabled:opacity-50"
                >
                  {isLoading ? 'Memproses...' : 'Masuk'}
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Google OAuth Mock */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-500">Masuk dengan Google</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2.5 hover:bg-slate-50 transition"
              >
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 bg-red-500 rounded-full" />
                  <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                </div>
                <span className="text-sm font-semibold text-slate-700">Masuk dengan Google</span>
              </button>

              <div className="text-center text-xs pt-1">
                <span className="text-slate-600">Belum punya akun? </span>
                <button className="text-blue-900 font-medium hover:underline">
                  Klik disini untuk daftar
                </button>
              </div>

              <p className="text-center text-xs text-slate-400 leading-relaxed">
                Dengan masuk, Anda menyetujui{' '}
                <button className="text-slate-500 underline hover:text-slate-700">
                  Syarat & Ketentuan Layanan
                </button>{' '}
                serta<br/>
                <button className="text-slate-500 underline hover:text-slate-700">
                  Kebijakan Privasi Data Siswa
                </button>{' '}
                ClassIn.
              </p>
            </div>
          </div>

          {/* Footer - App Download */}
          <div className="px-0 lg:px-14 pt-8">
            <div className="w-full max-w-md pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium">Unduh Aplikasi Mobile:</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-slate-900 rounded-lg shadow-sm flex items-center gap-2 hover:bg-slate-800 transition">
                  <div className="w-3.5 h-4 bg-white rounded-sm" />
                  <div className="text-left">
                    <div className="text-[8px] text-slate-300 uppercase leading-none tracking-wide">DOWNLOAD DI</div>
                    <div className="text-xs text-white font-semibold leading-tight">App Store</div>
                  </div>
                </button>
                <button className="px-3 py-1.5 bg-slate-900 rounded-lg shadow-sm flex items-center gap-2 hover:bg-slate-800 transition">
                  <svg className="w-3.5 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#00D7FF"/>
                    <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#FFCE00"/>
                    <path d="M3.84 2.15L6.05 2.66L14.54 11.15L6.05 2.66L3.84 2.15Z" fill="#F7630C"/>
                    <path d="M16.81 8.88L19.69 10.5C20.41 10.9 20.41 11.93 19.69 12.33L16.81 13.95L14.54 11.68L16.81 8.88Z" fill="#00C000"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[8px] text-slate-300 uppercase leading-none tracking-wide">TEMUKAN DI</div>
                    <div className="text-xs text-white font-semibold leading-tight">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

