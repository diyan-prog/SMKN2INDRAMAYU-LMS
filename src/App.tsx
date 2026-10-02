import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/auth/Login';
import ForgotPasswordStep1 from './pages/auth/ForgotPasswordStep1';
import ForgotPasswordStep2 from './pages/auth/ForgotPasswordStep2';
import ForgotPasswordStep3 from './pages/auth/ForgotPasswordStep3';
import NotFound from './pages/NotFound';

// Guru Pages
import GuruDashboard from './pages/guru/Dashboard';
import GuruMateri from './pages/guru/Materi';
import GuruTugas from './pages/guru/Tugas';
import GuruKuis from './pages/guru/Kuis';
import GuruPresensi from './pages/guru/Presensi';
import GuruNilai from './pages/guru/Nilai';

// Siswa Pages
import SiswaDashboard from './pages/siswa/Dashboard';
import SiswaMateri from './pages/siswa/Materi';
import SiswaTugas from './pages/siswa/Tugas';
import SiswaKuis from './pages/siswa/Kuis';
import SiswaNilai from './pages/siswa/Nilai';
import KuisAktif from './pages/siswa/KuisAktif';

// Wali Kelas Pages
import WaliKelasDashboard from './pages/walikelas/Dashboard';
import WaliKelasNilai from './pages/walikelas/Nilai';
import WaliKelasPresensi from './pages/walikelas/Presensi';
import WaliKelasKelas from './pages/walikelas/Kelas';

// Tata Usaha Pages
import TataUsahaDashboard from './pages/tatausaha/Dashboard';
import TataUsahaSiswa from './pages/tatausaha/Siswa';
import TataUsahaGuru from './pages/tatausaha/Guru';
import TataUsahaKelas from './pages/tatausaha/Kelas';

// Kepsek Pages
import KepsekDashboard from './pages/kepsek/Dashboard';
import KepsekLaporan from './pages/kepsek/Laporan';

// Layout wrapper untuk authenticated pages
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={`/${userRole ?? 'siswa'}/dashboard`} replace />}
        />
        <Route
          path="/"
          element={!user ? <Navigate to="/login" replace /> : <Navigate to={`/${userRole ?? 'siswa'}/dashboard`} replace />}
        />
        <Route path="/lupa-password" element={<ForgotPasswordStep1 />} />
        <Route path="/lupa-password/verifikasi" element={<ForgotPasswordStep2 />} />
        <Route path="/lupa-password/reset" element={<ForgotPasswordStep3 />} />

        {/* Protected Routes - Guru */}
        <Route
          path="/guru/dashboard"
          element={
            <ProtectedRoute allowedRoles={['guru']}>
              <AppLayout>
                <GuruDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guru/materi"
          element={
            <ProtectedRoute allowedRoles={['guru']}>
              <AppLayout>
                <GuruMateri />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guru/tugas"
          element={
            <ProtectedRoute allowedRoles={['guru']}>
              <AppLayout>
                <GuruTugas />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guru/kuis"
          element={
            <ProtectedRoute allowedRoles={['guru']}>
              <AppLayout>
                <GuruKuis />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guru/presensi"
          element={
            <ProtectedRoute allowedRoles={['guru']}>
              <AppLayout>
                <GuruPresensi />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guru/nilai"
          element={
            <ProtectedRoute allowedRoles={['guru']}>
              <AppLayout>
                <GuruNilai />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Siswa */}
        <Route
          path="/siswa/dashboard"
          element={
            <ProtectedRoute allowedRoles={['siswa']}>
              <AppLayout>
                <SiswaDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/siswa/materi"
          element={
            <ProtectedRoute allowedRoles={['siswa']}>
              <AppLayout>
                <SiswaMateri />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/siswa/tugas"
          element={
            <ProtectedRoute allowedRoles={['siswa']}>
              <AppLayout>
                <SiswaTugas />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/siswa/kuis"
          element={
            <ProtectedRoute allowedRoles={['siswa']}>
              <AppLayout>
                <SiswaKuis />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/siswa/nilai"
          element={
            <ProtectedRoute allowedRoles={['siswa']}>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 overflow-y-auto pt-16">
                  <SiswaNilai />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/siswa/kuis-aktif"
          element={
            <ProtectedRoute allowedRoles={['siswa']}>
              <AppLayout>
                <KuisAktif />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Wali Kelas */}
        <Route
          path="/walikelas/dashboard"
          element={
            <ProtectedRoute allowedRoles={['walikelas']}>
              <AppLayout>
                <WaliKelasDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/walikelas/nilai"
          element={
            <ProtectedRoute allowedRoles={['walikelas']}>
              <AppLayout>
                <WaliKelasNilai />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/walikelas/presensi"
          element={
            <ProtectedRoute allowedRoles={['walikelas']}>
              <AppLayout>
                <WaliKelasPresensi />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/walikelas/kelas"
          element={
            <ProtectedRoute allowedRoles={['walikelas']}>
              <AppLayout>
                <WaliKelasKelas />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Tata Usaha */}
        <Route
          path="/tatausaha/dashboard"
          element={
            <ProtectedRoute allowedRoles={['tatausaha']}>
              <AppLayout>
                <TataUsahaDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tatausaha/siswa"
          element={
            <ProtectedRoute allowedRoles={['tatausaha']}>
              <AppLayout>
                <TataUsahaSiswa />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tatausaha/guru"
          element={
            <ProtectedRoute allowedRoles={['tatausaha']}>
              <AppLayout>
                <TataUsahaGuru />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tatausaha/kelas"
          element={
            <ProtectedRoute allowedRoles={['tatausaha']}>
              <AppLayout>
                <TataUsahaKelas />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Kepala Sekolah */}
        <Route
          path="/kepsek/dashboard"
          element={
            <ProtectedRoute allowedRoles={['kepsek']}>
              <AppLayout>
                <KepsekDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kepsek/laporan"
          element={
            <ProtectedRoute allowedRoles={['kepsek']}>
              <AppLayout>
                <KepsekLaporan />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
