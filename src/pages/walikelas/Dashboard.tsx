import { Users, ClipboardCheck, TrendingUp, Award, Calendar, BookOpen } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function WaliKelasDashboard() {
  return (
    <div className="space-y-6">
      <BackButton />
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Wali Kelas</h1>
        <p className="text-gray-600 mt-1">Monitoring dan rekap kelas XII RPL 1 • Semester Genap 2024/2025</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Siswa</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">36</p>
              <p className="text-xs text-blue-900 mt-1">XII RPL 1</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="text-blue-900" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Rata-rata Kelas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">85.4</p>
              <p className="text-xs text-blue-900 mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +2.3 dari bulan lalu
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
              <p className="text-sm text-gray-600 font-medium">Kehadiran Minggu Ini</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">94%</p>
              <p className="text-xs text-gray-600 mt-1">34 dari 36 siswa hadir</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ClipboardCheck className="text-blue-900" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Agenda Mendatang</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
              <p className="text-xs text-gray-600 mt-1">PTS, Rapat, Kunjungan</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-900" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rekap Nilai */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Rekap Nilai per Mata Pelajaran</h2>
            <button className="text-sm text-blue-900 font-medium hover:underline">Lihat Detail</button>
          </div>
          <div className="space-y-4">
            {[
              { mapel: 'Pemrograman Web & Bergerak', rata: 88.5, tertinggi: 95, terendah: 78 },
              { mapel: 'Basis Data & Cloud Computing', rata: 92.0, tertinggi: 98, terendah: 85 },
              { mapel: 'Pemodelan PPL', rata: 86.5, tertinggi: 93, terendah: 80 },
              { mapel: 'PKK Kejuruan', rata: 90.0, tertinggi: 95, terendah: 83 },
              { mapel: 'Bahasa Inggris', rata: 88.0, tertinggi: 94, terendah: 79 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.mapel}</p>
                    <p className="text-xs text-gray-600">Tertinggi: {item.tertinggi} • Terendah: {item.terendah}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-900">{item.rata}</p>
                  <p className="text-xs text-gray-600">Rata-rata</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kehadiran & Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Kehadiran Hari Ini</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Hadir</span>
                <span className="text-sm font-bold text-blue-900">34 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sakit</span>
                <span className="text-sm font-bold text-amber-600">1 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Izin</span>
                <span className="text-sm font-bold text-violet-600">1 siswa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Alpha</span>
                <span className="text-sm font-bold text-red-600">0 siswa</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-sm p-6 text-white">
            <h3 className="font-bold mb-2">Agenda Mendatang</h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm font-semibold">PTS Genap 2024/2025</p>
                <p className="text-xs text-blue-100 mt-1">24 Maret 2025 • Serentak</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm font-semibold">Rapat Wali Kelas</p>
                <p className="text-xs text-blue-100 mt-1">15 Maret 2025 • 14:00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
