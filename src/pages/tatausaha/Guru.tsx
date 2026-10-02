import { Search, Plus, Download, Edit2, Trash2 } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { useState } from 'react';

export default function TataUsahaGuru() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'semua' | 'pns' | 'pppk' | 'honorer'>('semua');

  const guru = [
    { nip: '198712152015032010', nama: 'Ibu Siti Nurhaliza', mapel: 'Bahasa Indonesia', status: 'PNS' },
    { nip: '198605201986021001', nama: 'Bapak Suryanto, S.Kom', mapel: 'Pemrograman Web', status: 'PNS' },
    { nip: '199003152019031005', nama: 'Ibu Dewi Sartika, S.Pd', mapel: 'Matematika', status: 'PPPK' },
    { nip: '198801102010121002', nama: 'Bapak Ahmad Dahlan, M.Pd', mapel: 'Basis Data', status: 'PNS' },
    { nip: '199205172020042006', nama: 'Ibu Kartini Putri, S.Kom', mapel: 'Jaringan Komputer', status: 'PPPK' },
    { nip: '199801252021051001', nama: 'Bapak Budi Santoso', mapel: 'Bahasa Inggris', status: 'Honorer' },
  ];

  const filtered = guru.filter(g => {
    const matchSearch = g.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       g.nip.includes(searchTerm);
    const matchFilter = filter === 'semua' || g.status.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Guru & Staff</h1>
          <p className="text-gray-600 mt-1">Kelola data guru dan staff sekolah • Total: 87 orang</p>
        </div>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-800">
          <Plus size={16} /> Tambah Guru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Cari Guru</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="NIP atau nama guru..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Status Kepegawaian</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="semua">Semua</option>
              <option value="pns">PNS</option>
              <option value="pppk">PPPK</option>
              <option value="honorer">Honorer</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-200">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Total Guru</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">87</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">PNS</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">52</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">PPPK</p>
          <p className="text-3xl font-bold text-violet-600 mt-2">28</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Honorer</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">7</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">NIP</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Nama Guru</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Mata Pelajaran</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{item.nip}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{item.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{item.mapel}</td>
                  <td className="px-4 py-3">
                    {item.status === 'PNS' && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">PNS</span>
                    )}
                    {item.status === 'PPPK' && (
                      <span className="px-2 py-1 bg-violet-50 text-violet-700 text-xs font-semibold rounded">PPPK</span>
                    )}
                    {item.status === 'Honorer' && (
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded">Honorer</span>
                    )}
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
