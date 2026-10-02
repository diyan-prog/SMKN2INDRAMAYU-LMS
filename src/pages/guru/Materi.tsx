import { useState } from 'react';
import { Plus, Search, FileText, Video, Trash2, Edit, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import { EmptyState } from '@/components/ui/EmptyState';
import { BackButton } from '@/components/ui/BackButton';
import { formatDate } from '@/utils/formatDate';

export default function GuruMateri() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [materi, setMateri] = useState([
    {
      id: '1',
      judul: 'Pengenalan HTML5',
      mapel: 'Pemrograman Web',
      kelas: 'XI RPL 1',
      tanggal: '2026-09-28',
      file_materi: 'html5-intro.pdf',
      link_video: 'https://youtube.com/watch?v=abc123',
      type: 'mixed',
    },
    {
      id: '2',
      judul: 'CSS Modern dan Flexbox',
      mapel: 'Pemrograman Web',
      kelas: 'XI RPL 1',
      tanggal: '2026-09-25',
      file_materi: null,
      link_video: 'https://youtube.com/watch?v=def456',
      type: 'video',
    },
  ]);

  const filteredMateri = materi.filter(m =>
    m.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mapel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setMateri(materi.filter(m => m.id !== id));
  };

  const columns = [
    {
      key: 'judul' as const,
      label: 'Judul Materi',
      render: (value: string, row: typeof materi[0]) => (
        <div className="space-y-1">
          <p className="font-semibold text-gray-900">{value}</p>
          <div className="flex items-center gap-2">
            {row.file_materi && (
              <Badge variant="info" size="sm">
                <FileText size={12} className="mr-1" /> File
              </Badge>
            )}
            {row.link_video && (
              <Badge variant="success" size="sm">
                <Video size={12} className="mr-1" /> Video
              </Badge>
            )}
          </div>
        </div>
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
      key: 'tanggal' as const,
      label: 'Tanggal Upload',
      render: (value: string) => formatDate(value, 'd MMM yyyy'),
    },
    {
      key: 'id' as const,
      label: 'Aksi',
      render: (_: string, row: typeof materi[0]) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Lihat">
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
          <h1 className="text-2xl font-bold text-gray-900">Kelola Materi</h1>
          <p className="text-gray-500">Kelola semua materi pembelajaran Anda</p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          icon={<Plus size={20} />}
        >
          Tambah Materi
        </Button>
      </div>

      <Card className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Cari materi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>

        {filteredMateri.length === 0 ? (
          <EmptyState
            title="Belum ada materi"
            description="Mulai upload materi pembelajaran Anda untuk memulai"
            icon={<FileText size={48} className="text-gray-300" />}
            action={
              <Button
                onClick={() => setShowAddModal(true)}
                variant="primary"
              >
                Buat Materi Baru
              </Button>
            }
          />
        ) : (
          <Table
            columns={columns}
            data={filteredMateri}
            keyExtractor={(row) => row.id}
          />
        )}
      </Card>

      {/* Modal Tambah Materi */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Tambah Materi Baru"
        size="lg"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowAddModal(false)}
            >
              Batal
            </Button>
            <Button>Simpan Materi</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Judul Materi" placeholder="Contoh: Pengenalan HTML5" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Mata Pelajaran" placeholder="Pilih mata pelajaran" />
            <Input label="Kelas" placeholder="Pilih kelas" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              rows={3}
              placeholder="Jelaskan konten materi..."
            />
          </div>
          <Input label="Upload File (PDF/Word/Excel)" type="file" />
          <Input label="Link Video (YouTube)" placeholder="https://youtube.com/..." />
        </div>
      </Modal>
    </div>
  );
}

