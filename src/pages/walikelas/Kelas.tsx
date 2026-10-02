import { Users, User, Calendar } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

export default function WaliKelasKelas() {
  const daftarSiswa = [
    { nisn: '0064928172', nama: 'Ahmad Fauzi', ttl: '15 Mei 2007', alamat: 'Jl. Merdeka No. 45' },
    { nisn: '0064928173', nama: 'Siti Rahmawati', ttl: '20 Juni 2007', alamat: 'Jl. Gatot Subroto No. 78' },
    { nisn: '0064928174', nama: 'Budi Santoso', ttl: '12 Agustus 2007', alamat: 'Jl. Ahmad Yani No. 23' },
    { nisn: '0064928175', nama: 'Dewi Lestari', ttl: '08 Juli 2007', alamat: 'Jl. Diponegoro No. 56' },
    { nisn: '0064928176', nama: 'Eko Prasetyo', ttl: '03 September 2007', alamat: 'Jl. Pendidikan No. 89' },
  ];

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Kelas</h1>
        <p className="text-gray-600 mt-1">Kelola informasi kelas XII RPL 1 yang Anda walikan</p>
      </div>

      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl shadow-sm p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p className="text-blue-100 text-sm font-medium">Nama Kelas</p>
            <p className="text-2xl font-bold mt-2">XII RPL 1</p>
            <p className="text-xs text-blue-200 mt-1">Rekayasa Perangkat Lunak</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Siswa</p>
            <p className="text-2xl font-bold mt-2">36</p>
            <p className="text-xs text-blue-200 mt-1">Siswa aktif</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium">Ruang Kelas</p>
            <p className="text-2xl font-bold mt-2">Ruang 12.1</p>
            <p className="text-xs text-blue-200 mt-1">Lantai 1</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium">Status</p>
            <p className="text-2xl font-bold mt-2">Aktif</p>
            <p className="text-xs text-blue-200 mt-1">Tahun Ajaran 2024/2025</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Wali Kelas</h3>
            <User size={20} className="text-blue-900" />
          </div>
          <p className="text-lg font-semibold text-gray-900">Ibu Siti Nurhaliza</p>
          <p className="text-sm text-gray-600 mt-1">NIP: 198712152015032010</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Kepala Jurusan</h3>
            <User size={20} className="text-blue-900" />
          </div>
          <p className="text-lg font-semibold text-gray-900">Bapak Suryanto, S.Kom</p>
          <p className="text-sm text-gray-600 mt-1">NIP: 198605201986021001</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Tahun Akademik</h3>
            <Calendar size={20} className="text-blue-900" />
          </div>
          <p className="text-lg font-semibold text-gray-900">2024/2025</p>
          <p className="text-sm text-gray-600 mt-1">Semester Genap</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users size={20} className="text-blue-900" />
              Daftar Siswa
            </h2>
            <span className="px-3 py-1 bg-blue-50 text-blue-900 text-sm font-semibold rounded">36 siswa</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">No</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">NISN</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Nama Siswa</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Tanggal Lahir</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Alamat</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarSiswa.map((siswa, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{i + 1}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{siswa.nisn}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{siswa.nama}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{siswa.ttl}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{siswa.alamat}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-blue-900 text-xs font-medium hover:underline">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
