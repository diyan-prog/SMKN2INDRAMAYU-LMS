import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { useState } from 'react';

export default function WaliKelasPresensi() {
  const [selectedDate, setSelectedDate] = useState('2025-03-01');
  const [filter, setFilter] = useState<'semua' | 'hadir' | 'sakit' | 'izin' | 'alpha'>('semua');

  const presensi = [
    { nisn: '0064928172', nama: 'Ahmad Fauzi', status: 'Hadir', jam: '07:15' },
    { nisn: '0064928173', nama: 'Siti Rahmawati', status: 'Hadir', jam: '07:20' },
    { nisn: '0064928174', nama: 'Budi Santoso', status: 'Sakit', jam: '-' },
    { nisn: '0064928175', nama: 'Dewi Lestari', status: 'Hadir', jam: '07:18' },
    { nisn: '0064928176', nama: 'Eko Prasetyo', status: 'Izin', jam: '-' },
  ];

  const filtered = presensi.filter(p => {
    if (filter === 'semua') return true;
    return p.status === (filter === 'hadir' ? 'Hadir' : filter === 'sakit' ? 'Sakit' : filter === 'izin' ? 'Izin' : 'Alpha');
  });

  const stats = {
    hadir: presensi.filter(p => p.status === 'Hadir').length,
    sakit: presensi.filter(p => p.status === 'Sakit').length,
    izin: presensi.filter(p => p.status === 'Izin').length,
    alpha: presensi.filter(p => p.status === 'Alpha').length,
  };

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rekap Presensi Kelas</h1>
        <p className="text-gray-600 mt-1">XII RPL 1 • Semester Genap 2024/2025</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <label className="text-sm font-semibold text-gray-700 block mb-2">Pilih Tanggal</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Hadir</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{stats.hadir}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={20} className="text-blue-900" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Sakit</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{stats.sakit}</p>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Izin</p>
              <p className="text-3xl font-bold text-violet-600 mt-2">{stats.izin}</p>
            </div>
            <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-violet-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Alpha</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.alpha}</p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('semua')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === 'semua'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilter('hadir')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === 'hadir'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hadir
          </button>
          <button
            onClick={() => setFilter('sakit')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === 'sakit'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sakit
          </button>
          <button
            onClick={() => setFilter('izin')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === 'izin'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Izin
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">NISN</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Nama Siswa</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-gray-600 uppercase">Jam Masuk</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{item.nisn}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{item.nama}</td>
                  <td className="px-4 py-3">
                    {item.status === 'Hadir' && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">Hadir</span>
                    )}
                    {item.status === 'Sakit' && (
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded">Sakit</span>
                    )}
                    {item.status === 'Izin' && (
                      <span className="px-2 py-1 bg-violet-50 text-violet-700 text-xs font-semibold rounded">Izin</span>
                    )}
                    {item.status === 'Alpha' && (
                      <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded">Alpha</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.jam}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-blue-900 text-xs font-medium hover:underline">Edit</button>
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
