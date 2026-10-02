import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';

interface Siswa {
  id: string;
  nama: string;
  nis: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alpa';
}

const mockSiswa: Siswa[] = [
  { id: '1', nama: 'Ahmad Fauzi', nis: '262710001', status: 'hadir' },
  { id: '2', nama: 'Budi Santoso', nis: '262710002', status: 'hadir' },
  { id: '3', nama: 'Siti Rahma', nis: '262710003', status: 'izin' },
  { id: '4', nama: 'Darto', nis: '262710004', status: 'sakit' },
  { id: '5', nama: 'Eko', nis: '262710005', status: 'alpa' },
];

export default function Presensi() {
  const [date, setDate] = useState('2026-10-01');

  return (
    <div className="space-y-6">
      <BackButton />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Presensi Kelas</h1>
          <p className="text-gray-500 mt-1">Kelas XI RPL 1 - {date}</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button>Simpan Presensi</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">NIS</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nama Siswa</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSiswa.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="px-4 py-3 text-sm text-gray-600">{s.nis}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{s.nama}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button className={`p-2 rounded-full ${s.status === 'hadir' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}><CheckCircle size={18}/></button>
                      <button className={`p-2 rounded-full ${s.status === 'izin' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100'}`}><Clock size={18}/></button>
                      <button className={`p-2 rounded-full ${s.status === 'sakit' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}><AlertCircle size={18}/></button>
                      <button className={`p-2 rounded-full ${s.status === 'alpa' ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}><XCircle size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

