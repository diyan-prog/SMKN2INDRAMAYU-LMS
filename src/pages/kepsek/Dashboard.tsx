import { TrendingUp, Users, Award, FileText, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function KepsekDashboard() {
  return (
    <div className="space-y-6">
      <BackButton />
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Kepala Sekolah</h1>
        <p className="text-gray-600 mt-1">Overview statistik dan laporan sekolah • Semester Genap 2024/2025</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Siswa</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,248</p>
              <p className="text-xs text-blue-900 mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +2.1% dari tahun lalu
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="text-blue-900" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Rata-rata Sekolah</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">84.7</p>
              <p className="text-xs text-blue-900 mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +1.8 poin semester ini
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Award className="text-blue-900" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Kehadiran Rata-rata</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">92.4%</p>
              <p className="text-xs text-blue-900 mt-1">Target: 95%</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-blue-900" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Laporan Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
              <p className="text-xs text-amber-600 mt-1">Perlu review segera</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <FileText className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performa per Jurusan */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Performa per Jurusan</h2>
            <button className="text-sm text-blue-900 font-medium hover:underline">Lihat Detail</button>
          </div>
          <div className="space-y-4">
            {[
              { jurusan: 'Rekayasa Perangkat Lunak (RPL)', siswa: 324, rata: 87.5, kehadiran: 94 },
              { jurusan: 'Teknik Komputer & Jaringan (TKJ)', siswa: 288, rata: 85.2, kehadiran: 93 },
              { jurusan: 'Akuntansi & Keuangan Lembaga (AKL)', siswa: 360, rata: 83.8, kehadiran: 91 },
              { jurusan: 'Otomatisasi Tata Kelola Perkantoran (OTKP)', siswa: 276, rata: 82.1, kehadiran: 90 },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{item.jurusan}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.siswa} siswa aktif</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900">{item.rata}</p>
                    <p className="text-xs text-gray-600">Rata-rata</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-xs text-gray-600">Kehadiran</p>
                    <p className="text-sm font-bold text-gray-900">{item.kehadiran}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Status</p>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-900 text-xs font-semibold rounded mt-1">
                      {item.rata >= 85 ? 'Sangat Baik' : 'Baik'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info & Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-600" />
              Notifikasi Penting
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm font-semibold text-amber-900">PTS Serentak</p>
                <p className="text-xs text-amber-700 mt-1">24 Maret 2025 • Persiapan CBT</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-900">Rapat Dewan Guru</p>
                <p className="text-xs text-blue-700 mt-1">15 Maret 2025 • 09:00 WIB</p>
              </div>
              <div className="p-3 bg-violet-50 rounded-lg border border-violet-200">
                <p className="text-sm font-semibold text-violet-900">Visitasi Akreditasi</p>
                <p className="text-xs text-violet-700 mt-1">30 Maret 2025 • Tim BAN-SM</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-sm p-6 text-white">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Ringkasan Semester
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Total Kegiatan</span>
                <span className="text-xl font-bold">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Prestasi Siswa</span>
                <span className="text-xl font-bold">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Kerjasama Industri</span>
                <span className="text-xl font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Lulusan Kompeten</span>
                <span className="text-xl font-bold">98.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
