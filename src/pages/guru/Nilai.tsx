import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';

interface SiswaNilai {
  id: string;
  nama: string;
  tugas: number;
  kuis: number;
  uts: number;
  uas: number;
  total: number;
}

const mockSiswa: SiswaNilai[] = [
  { id: '1', nama: 'Ahmad Fauzi', tugas: 85, kuis: 80, uts: 88, uas: 90, total: 86 },
  { id: '2', nama: 'Budi Santoso', tugas: 90, kuis: 85, uts: 82, uas: 88, total: 87 },
];

export default function NilaiGuru() {
  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Penilaian Siswa</h1>
        <p className="text-gray-500 mt-1">Kelas XI RPL 1 - Pemrograman Web</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nama Siswa</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Tugas</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Kuis</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">UTS</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">UAS</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Total</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockSiswa.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="px-4 py-3 font-medium text-gray-900">{s.nama}</td>
                  <td className="px-4 py-3 text-center">{s.tugas}</td>
                  <td className="px-4 py-3 text-center">{s.kuis}</td>
                  <td className="px-4 py-3 text-center">{s.uts}</td>
                  <td className="px-4 py-3 text-center">{s.uas}</td>
                  <td className="px-4 py-3 text-center font-bold text-primary">{s.total}</td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="secondary" size="sm">Edit</Button>
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

