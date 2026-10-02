import { useState } from 'react';
import { Plus, Search, Award, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';

interface Quiz {
  id: string;
  judul: string;
  mapel: string;
  kelas: string;
  jumlah_soal: number;
  durasi: number;
  peserta: number;
  status: 'draft' | 'aktif' | 'selesai';
}

const mockKuis: Quiz[] = [
  { id: '1', judul: 'Kuis Termodinamika', mapel: 'Fisika', kelas: 'XI RPL 1', jumlah_soal: 15, durasi: 30, peserta: 28, status: 'aktif' },
  { id: '2', judul: 'UTS Fisika', mapel: 'Fisika', kelas: 'X TKJ 1', jumlah_soal: 40, durasi: 90, peserta: 32, status: 'selesai' },
  { id: '3', judul: 'Kuis Gerak Parabola', mapel: 'Fisika', kelas: 'XI RPL 2', jumlah_soal: 20, durasi: 45, peserta: 0, status: 'draft' },
];

export default function KuisGuru() {
  const [search, setSearch] = useState('');
  const filtered = mockKuis.filter(k => k.judul.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <BackButton />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Kuis</h1>
          <p className="text-gray-500 mt-1">Buat dan kelola kuis untuk siswa.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          <span>Buat Kuis</span>
        </Button>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari kuis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((k) => (
          <Card key={k.id} className="hover:border-primary/40 transition-all">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{k.judul}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" size="sm">{k.mapel}</Badge>
                      <Badge variant="info" size="sm">{k.kelas}</Badge>
                      <Badge variant={k.status === 'aktif' ? 'success' : k.status === 'draft' ? 'secondary' : 'info'} size="sm">
                        {k.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 ml-11">
                  📝 {k.jumlah_soal} soal • ⏱️ {k.durasi} menit • 👥 {k.peserta} peserta
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <Edit size={14} /> Edit
                </Button>
                <Button variant="secondary" size="sm" className="gap-1.5 text-red-600 hover:bg-red-50">
                  <Trash2 size={14} /> Hapus
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

