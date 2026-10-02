import { Search, Download } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { useState } from 'react';

export default function WaliKelasNilai() {
  const [filter, setFilter] = useState<'semua' | 'mapel' | 'range'>('semua');
  const [searchTerm, setSearchTerm] = useState('');

  const siswa = [
    { nisn: '0064928172', nama: 'Ahmad Fauzi', mapel: 'Pemrograman Web', nilai: 88, status: 'Tuntas' },
    { nisn: '0064928173', nama: 'Siti Rahmawati', mapel: 'Pemrograman Web', nilai: 92, status: 'Tuntas' },
    { nisn: '0064928174', nama: 'Budi Santoso', mapel: 'Basis Data', nilai: 75, status: 'Tuntas' },
    { nisn: '0064928175', nama: 'Dewi Lestari', mapel: 'Pemrograman Web', nilai: 85, status: 'Tuntas' },
    { nisn: '0064928176', nama: 'Eko Prasetyo', mapel: 'Basis Data', nilai: 78, status: 'Tuntas' },
  ];

  const filtered = siswa.filter(s => 
    s.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rekap Nilai Kelas</h1>
          <p className="text-gray-600 mt-1">XII RPL 1 • Semester Genap 2024/2025</p>
        </div>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-800">
          <Download size={16} /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Cari Siswa</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nama atau NISN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Filter</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="semua">Semua</option>
              <option value="mapel">Per Mata Pelajaran</option>
              <option value="range">Range Nilai</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Rata-rata Kelas</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">84.8</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Nilai Tertinggi</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">92</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Nilai Terendah</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">75</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Siswa Tuntas</p>
          <p className="text-3xl font-bold text-green-600 mt-2">100%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">NISN</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Nama Siswa</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Mata Pelajaran</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-gray-600 uppercase">Nilai</th>
                <th className="text-center px-4 py-3 text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{item.nisn}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{item.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{item.mapel}</td>
                  <td className="px-4 py-3 text-center font-bold text-gray-900">{item.nilai}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded">
                      {item.status}
                    </span>
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
    </div>
  );
}
