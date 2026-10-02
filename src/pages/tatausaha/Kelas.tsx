import { Search, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { useState } from 'react';

export default function TataUsahaKelas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'semua' | 'x' | 'xi' | 'xii'>('semua');

  const kelas = [
    { id: 1, nama: 'X RPL 1', tingkat: 'X', jurusan: 'Rekayasa Perangkat Lunak', siswa: 36, wali: 'Budi Santoso' },
    { id: 2, nama: 'X RPL 2', tingkat: 'X', jurusan: 'Rekayasa Perangkat Lunak', siswa: 34, wali: 'Dewi Lestari' },
    { id: 3, nama: 'XI RPL 1', tingkat: 'XI', jurusan: 'Rekayasa Perangkat Lunak', siswa: 35, wali: 'Ahmad Dahlan' },
    { id: 4, nama: 'XII RPL 1', tingkat: 'XII', jurusan: 'Rekayasa Perangkat Lunak', siswa: 36, wali: 'Siti Nurhaliza' },
    { id: 5, nama: 'XII TKJ 1', tingkat: 'XII', jurusan: 'Teknik Komputer & Jaringan', siswa: 32, wali: 'Suryanto' },
    { id: 6, nama: 'XII AKL 1', tingkat: 'XII', jurusan: 'Akuntansi & Keuangan', siswa: 38, wali: 'Kartini Putri' },
  ];

  const filtered = kelas.filter(k => {
    const matchSearch = k.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === 'semua' || k.tingkat.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Kelas</h1>
          <p className="text-gray-600 mt-1">Kelola data kelas seluruh tingkat • Total: 36 kelas</p>
        </div>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-800">
          <Plus size={16} /> Tambah Kelas
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Cari Kelas</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nama kelas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Tingkat</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="semua">Semua</option>
              <option value="x">Kelas X</option>
              <option value="xi">Kelas XI</option>
              <option value="xii">Kelas XII</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Total Kelas</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">36</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Kelas X</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">12</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Kelas XI</p>
          <p className="text-3xl font-bold text-violet-600 mt-2">12</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Kelas XII</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{item.nama}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.jurusan}</p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-900 text-xs font-semibold rounded">
                {item.tingkat}
              </span>
            </div>
            
            <div className="space-y-3 pt-3 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-gray-400" />
                <span className="text-gray-600">{item.siswa} siswa</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Wali Kelas:</span>
                <span className="font-semibold text-gray-900">{item.wali}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t">
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2">
                <Edit2 size={14} /> Edit
              </button>
              <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
