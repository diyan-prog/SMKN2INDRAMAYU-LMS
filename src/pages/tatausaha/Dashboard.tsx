import { Users, User, BookOpen, Search, Plus, FileText } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function TataUsahaDashboard() {
  return (
    <div className="space-y-6">
      <BackButton />
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Tata Usaha</h1>
          <p className="text-gray-600 mt-1">Kelola data master sekolah • Tahun Ajaran 2024/2025</p>
        </div>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg shadow-sm flex items-center gap-2 text-sm font-semibold hover:bg-blue-800">
          <Plus size={16} /> Tambah Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Siswa Aktif</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,248</p>
              <p className="text-xs text-blue-900 mt-1">Semua kelas & jurusan</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="text-blue-900" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Guru & Staff</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">87</p>
              <p className="text-xs text-blue-900 mt-1">PNS, PPPK, Honorer</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <User className="text-blue-900" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Jumlah Kelas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">36</p>
              <p className="text-xs text-blue-900 mt-1">X, XI, XII semua jurusan</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-900" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Dokumen Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
              <p className="text-xs text-amber-600 mt-1">Perlu verifikasi segera</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <FileText className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Siswa Terbaru */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Data Siswa Terbaru</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari siswa..." 
                  className="pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <button className="text-sm text-blue-900 font-medium hover:underline">Lihat Semua</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">NISN</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Nama Lengkap</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Kelas</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-gray-600 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nisn: '0064928172', nama: 'Ahmad Fauzi', kelas: 'XII RPL 1', status: 'Aktif' },
                  { nisn: '0064928173', nama: 'Siti Rahmawati', kelas: 'XII RPL 1', status: 'Aktif' },
                  { nisn: '0064928174', nama: 'Budi Santoso', kelas: 'XII TKJ 2', status: 'Aktif' },
                  { nisn: '0064928175', nama: 'Dewi Lestari', kelas: 'XII AKL 1', status: 'Aktif' },
                  { nisn: '0064928176', nama: 'Eko Prasetyo', kelas: 'XII OTKP 1', status: 'Aktif' },
                ].map((siswa, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{siswa.nisn}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{siswa.nama}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-900 text-xs font-semibold rounded">{siswa.kelas}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-900 text-xs font-semibold rounded">{siswa.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-blue-900 text-xs font-medium hover:underline">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-3 bg-blue-50 text-blue-900 rounded-lg text-sm font-semibold hover:bg-blue-100 transition text-left">
                + Tambah Siswa Baru
              </button>
              <button className="w-full px-4 py-3 bg-blue-50 text-blue-900 rounded-lg text-sm font-semibold hover:bg-blue-100 transition text-left">
                + Tambah Guru Baru
              </button>
              <button className="w-full px-4 py-3 bg-blue-50 text-blue-900 rounded-lg text-sm font-semibold hover:bg-blue-100 transition text-left">
                + Buat Kelas Baru
              </button>
              <button className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 transition text-left">
                📄 Export Data Dapodik
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-sm p-6 text-white">
            <h3 className="font-bold mb-2">Statistik Bulan Ini</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Siswa Baru</span>
                <span className="text-xl font-bold">+24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Mutasi Keluar</span>
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-100">Data Diperbarui</span>
                <span className="text-xl font-bold">156</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
