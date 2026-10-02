import { useState } from 'react';
import { Bell, LogOut, Menu, X, ChevronDown, LayoutDashboard, BookOpen, FileText, HelpCircle, CheckSquare, BarChart3, Users, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { getRoleLabel } from '@/utils/roleHelper';
import type { UserRole } from '@/types/user';

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const MENU_ITEMS: Record<UserRole, MenuItem[]> = {
  guru: [
    { path: '/guru/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/guru/materi', label: 'Materi', icon: <BookOpen size={18} /> },
    { path: '/guru/tugas', label: 'Tugas', icon: <FileText size={18} /> },
    { path: '/guru/kuis', label: 'Kuis', icon: <HelpCircle size={18} /> },
    { path: '/guru/presensi', label: 'Presensi', icon: <CheckSquare size={18} /> },
    { path: '/guru/nilai', label: 'Nilai', icon: <BarChart3 size={18} /> },
  ],
  siswa: [
    { path: '/siswa/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/siswa/materi', label: 'Materi', icon: <BookOpen size={18} /> },
    { path: '/siswa/tugas', label: 'Tugas', icon: <FileText size={18} /> },
    { path: '/siswa/kuis', label: 'Kuis', icon: <HelpCircle size={18} /> },
    { path: '/siswa/nilai', label: 'Nilai', icon: <BarChart3 size={18} /> },
  ],
  walikelas: [
    { path: '/walikelas/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/walikelas/nilai', label: 'Nilai', icon: <BarChart3 size={18} /> },
    { path: '/walikelas/presensi', label: 'Presensi', icon: <CheckSquare size={18} /> },
    { path: '/walikelas/kelas', label: 'Kelas', icon: <Users size={18} /> },
  ],
  tatausaha: [
    { path: '/tatausaha/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/tatausaha/siswa', label: 'Siswa', icon: <Users size={18} /> },
    { path: '/tatausaha/guru', label: 'Guru', icon: <User size={18} /> },
    { path: '/tatausaha/kelas', label: 'Kelas', icon: <BookOpen size={18} /> },
  ],
  kepsek: [
    { path: '/kepsek/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/kepsek/laporan', label: 'Laporan', icon: <FileText size={18} /> },
  ],
};

export default function Navbar() {
  const { userProfile, logout } = useAuth();
  const { getUserInitials } = useRole();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  if (!userProfile) return null;

  const navItems: MenuItem[] = MENU_ITEMS[userProfile.role] || [];
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/95 backdrop-blur-sm text-white shadow-lg z-40 h-16 border-b border-white/10">
      <div className="h-full px-4 md:px-8 flex items-center justify-between max-w-full">
        <Link to={`/${userProfile.role}/dashboard`} className="flex items-center gap-3 flex-shrink-0 hover:opacity-90 transition-all group">
          <img src="/SMK_Negeri_2_Indramayu.png" alt="Logo SMK Negeri 2 Indramayu" className="w-10 h-10 object-contain" />
          <div className="hidden sm:flex flex-col">
            <h1 className="text-sm font-bold leading-tight tracking-tight">SMK Negeri 2 Indramayu</h1>
            <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors">Learning Management System</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-10">
          {navItems.map((item: MenuItem) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2.5 relative group ${
                isActive(item.path)
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'hover:bg-white/10 text-white/90 hover:text-white'
              }`}
            >
              <span className="flex-shrink-0 transition-transform group-hover:scale-110 duration-200">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-white/80 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button 
            className="p-2.5 hover:bg-white/10 rounded-lg transition-all lg:hidden" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button className="p-2.5 hover:bg-white/10 rounded-lg transition-all hidden md:flex relative group">
            <Bell size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-white/10 rounded-lg transition-all group"
            >
              <div className="w-8 h-8 bg-white/30 text-white font-bold text-xs rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors shadow-md border border-white/20">
                {getUserInitials()}
              </div>
              <ChevronDown size={16} className={`hidden md:block transition-transform duration-200 ${
                showProfile ? 'rotate-180' : ''
              }`} />
            </button>

            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <div className="absolute right-0 top-full mt-3 w-64 bg-white text-gray-900 rounded-xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                    <p className="font-bold text-sm text-gray-900">{userProfile.nama_lengkap}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{getRoleLabel(userProfile.role)}</p>
                    <p className="text-xs text-gray-400 mt-1">{userProfile.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfile(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all font-medium"
                  >
                    <LogOut size={18} />
                    <span>Keluar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div className="lg:hidden bg-primary/95 backdrop-blur-md border-t border-white/10 absolute top-16 left-0 right-0 z-50 shadow-2xl">
          <nav className="p-3 space-y-1">
            {navItems.map((item: MenuItem) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white/20 font-semibold text-white'
                    : 'hover:bg-white/10 text-white/90'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
