import { Search, Plus, Download, Edit2, Trash2 } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { useState } from 'react';

export default function TataUsahaSiswa() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'semua' | 'aktif' | 'nonaktif'>('semua');

  const siswa = [
    { nisn: '0064928172', nama: 'Ahmad Fauzi', kelas: 'XII RPL 1', ttl: '15-05-2007', status: 'Aktif' },
    { nisn: '0064928173', nama: 'Siti Rahmawati', kelas: 'XII RPL 1', ttl: '20-06-2007', status: 'Aktif' },
    { nisn: '0064928174', nama: 'Budi Santoso', kelas: 'XII TKJ 2', ttl: '12-08-2007', status: 'Aktif' },
    { nisn: '0064928175', nama: 'Dewi Lestari', kelas: 'XII AKL 1', ttl: '08-07-2007', status: 'Aktif' },
    { nisn: '0064928176', nama: 'Eko Prasetyo', kelas: 'XII OTKP 1', ttl: '03-09-2007', status: 'Aktif' },
    { nisn: '0064928170', nama: 'Rini Wijaya', kelas: 'X RPL 1', ttl: '25-03-2008', status: 'Aktif' },
  ];

  const filtered = siswa.filter(s => {
    const matchSearch = s.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       s.nisn.includes(searchTerm);
    const matchFilter = filter === 'semua' || s.status === (filter === 'aktif' ? 'Aktif' : 'Non-Aktif');
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Siswa</h1>
          <p className="text-gray-600 mt-1">Kelola data siswa seluruh kelas • Total: {siswa.length} siswa aktif</p>
        </div>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-800">
          <Plus size={16} /> Tambah Siswa
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
                placeholder="NISN atau nama siswa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Status</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="semua">Semua</option>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Non-Aktif</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-200">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Total Siswa</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,248</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Siswa Aktif</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">1,248</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Siswa Non-Aktif</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">NISN</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Nama Siswa</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Kelas</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">TTL</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{item.nisn}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{item.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{item.kelas}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{item.ttl}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1 text-blue-900 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
