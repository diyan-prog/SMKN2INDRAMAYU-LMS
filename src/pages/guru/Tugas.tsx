import { useState } from 'react';
import { Plus, Search, Clock, CheckCircle, XCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { EmptyState } from '@/components/ui/EmptyState';
import { BackButton } from '@/components/ui/BackButton';
import { formatDeadline } from '@/utils/formatDate';

export default function GuruTugas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [tugas, setTugas] = useState([
    {
      id: '1',
      judul: 'Tugas CRUD PHP',
      mapel: 'Pemrograman Web',
      kelas: 'XI RPL 1',
      deadline: '2026-10-03T23:59:00',
      dikumpulkan: 24,
      totalSiswa: 36,
      created_at: '2026-09-25',
    },
    {
      id: '2',
      judul: 'E-R Diagram Database Sekolah',
      mapel: 'Basis Data',
      kelas: 'XII RPL 1',
      deadline: '2026-10-05T23:59:00',
      dikumpulkan: 12,
      totalSiswa: 32,
      created_at: '2026-09-20',
    },
    {
      id: '3',
      judul: 'Laporan Praktikum Sistem File',
      mapel: 'Sistem Operasi',
      kelas: 'XI RPL 1',
      deadline: '2026-09-29T23:59:00', // Overdue
      dikumpulkan: 28,
      totalSiswa: 36,
      created_at: '2026-09-15',
    },
  ]);

  const filteredTugas = tugas.filter(t =>
    t.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.mapel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setTugas(tugas.filter(t => t.id !== id));
  };

  const columns = [
    {
      key: 'judul' as const,
      label: 'Judul Tugas',
      render: (value: string) => (
        <p className="font-semibold text-gray-900">{value}</p>
      ),
    },
    {
      key: 'mapel' as const,
      label: 'Mata Pelajaran',
    },
    {
      key: 'kelas' as const,
      label: 'Kelas',
    },
    {
      key: 'deadline' as const,
      label: 'Deadline',
      render: (value: string) => {
        const { text, color } = formatDeadline(value);
        return <span className={color}>{text}</span>;
      },
    },
    {
      key: 'dikumpulkan' as const,
      label: 'Pengumpulan',
      render: (value: number, row: typeof tugas[0]) => {
        const percentage = Math.round((value / row.totalSiswa) * 100);
        const isComplete = percentage === 100;
        const isLow = percentage < 50;
        
        return (
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${isComplete ? 'text-blue-600' : isLow ? 'text-red-600' : 'text-amber-600'}`}>
              {value}/{row.totalSiswa}
            </span>
            <Badge
              variant={isComplete ? 'success' : isLow ? 'danger' : 'warning'}
              size="sm"
            >
              {percentage}%
            </Badge>
          </div>
        );
      },
    },
    {
      key: 'id' as const,
      label: 'Aksi',
      render: (_: string, row: typeof tugas[0]) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Lihat Pengumpulan">
            <Eye size={18} />
          </button>
          <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Edit">
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Hapus"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <BackButton />
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Tugas</h1>
          <p className="text-gray-500">Pantau pengumpulan tugas siswa</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          icon={<Plus size={20} />}
        >
          Buat Tugas
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Belum Dinilai</p>
            <p className="text-xl font-bold text-gray-900">15</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Sudah Dinilai</p>
            <p className="text-xl font-bold text-gray-900">49</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Terlambat</p>
            <p className="text-xl font-bold text-gray-900">8</p>
          </div>
        </Card>
      </div>

      <Card className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Cari tugas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>

        {filteredTugas.length === 0 ? (
          <EmptyState
            title="Belum ada tugas"
            description="Buat tugas pertama Anda untuk siswa"
            action={
              <Button onClick={() => setShowAddModal(true)}>
                Buat Tugas Baru
              </Button>
            }
          />
        ) : (
          <Table
            columns={columns}
            data={filteredTugas}
            keyExtractor={(row) => row.id}
          />
        )}
      </Card>

      {/* Modal Buat Tugas */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Buat Tugas Baru"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Batal
            </Button>
            <Button>Simpan Tugas</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Judul Tugas" placeholder="Contoh: Tugas CRUD PHP" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Mata Pelajaran" placeholder="Pilih mata pelajaran" />
            <Input label="Kelas" placeholder="Pilih kelas" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Tugas
            </label>
            <textarea
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              rows={4}
              placeholder="Jelaskan instruksi tugas..."
            />
          </div>
          <Input label="Deadline" type="datetime-local" />
          <Input label="Lampiran (opsional)" type="file" hint="PDF, Word, Excel, atau ZIP" />
        </div>
      </Modal>
    </div>
  );
}

