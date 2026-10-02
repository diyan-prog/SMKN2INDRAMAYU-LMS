import { FileText, Download, Calendar } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { useState } from 'react';

export default function KepsekLaporan() {
  const [periode, setPeriode] = useState('semester-genap');

  const laporan = [
    { id: 1, judul: 'Laporan Akademik Semester Genap', tanggal: '28 Feb 2025', status: 'Selesai', ukuran: '2.4 MB' },
    { id: 2, judul: 'Laporan Kehadiran Siswa Februari', tanggal: '25 Feb 2025', status: 'Selesai', ukuran: '1.8 MB' },
    { id: 3, judul: 'Rekap Nilai PTS Genap 2024/2025', tanggal: '20 Feb 2025', status: 'Draft', ukuran: '3.2 MB' },
    { id: 4, judul: 'Laporan Keuangan BOS Triwulan 1', tanggal: '15 Feb 2025', status: 'Selesai', ukuran: '5.1 MB' },
    { id: 5, judul: 'Evaluasi Kinerja Guru Semester Genap', tanggal: '10 Feb 2025', status: 'Draft', ukuran: '2.7 MB' },
  ];

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Sekolah</h1>
          <p className="text-gray-600 mt-1">Kelola laporan akademik dan non-akademik</p>
        </div>
        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-800">
          <FileText size={16} /> Buat Laporan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <label className="text-sm font-semibold text-gray-700 block mb-2">Periode Laporan</label>
        <select 
          value={periode}
          onChange={(e) => setPeriode(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
        >
          <option value="semester-ganjil">Semester Ganjil 2024/2025</option>
          <option value="semester-genap">Semester Genap 2024/2025</option>
          <option value="tahunan">Tahunan 2024/2025</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Total Laporan</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Selesai</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">18</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Draft</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">6</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600 font-medium">Bulan Ini</p>
          <p className="text-3xl font-bold text-violet-600 mt-2">5</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">Daftar Laporan</h2>
        </div>
        <div className="divide-y">
          {laporan.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.judul}</h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {item.tanggal}
                      </span>
                      <span>•</span>
                      <span>{item.ukuran}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.status === 'Selesai' ? (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">Selesai</span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded">Draft</span>
                  )}
                  {item.status === 'Selesai' && (
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-200">
                      <Download size={14} /> Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
