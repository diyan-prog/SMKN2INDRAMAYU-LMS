import { useState } from 'react';
import { Search, FileText, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { BackButton } from '@/components/ui/BackButton';
import { formatDeadline, isDeadlinePassed } from '@/utils/formatDate';

export default function SiswaTugas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'semua' | 'belum' | 'dikumpulkan' | 'dinilai'>('semua');

  const tugas = [
    {
      id: '1',
      judul: 'Tugas CRUD PHP & MySQL',
      mapel: 'Pemrograman Web',
      kelas: 'XI RPL 1',
      guru: 'Budi Santoso, S.Kom.',
      deskripsi: 'Buat aplikasi CRUD (Create, Read, Update, Delete) menggunakan PHP dan MySQL dengan tampilan user-friendly.',
      deadline: '2026-10-02T23:59:00',
      status: 'belum', // belum | dikumpulkan | dinilai
      file_lampiran: 'tugas-crud.pdf',
      nilai: null,
    },
    {
      id: '2',
      judul: 'Quiz Normalisasi Database',
      mapel: 'Basis Data',
      kelas: 'XII RPL 1',
      guru: 'Doni Hermawan, S.Kom.',
      deskripsi: 'Quiz online tentang konsep normalisasi database dari 1NF sampai 3NF. Waktu 60 menit.',
      deadline: '2026-10-05T15:00:00',
      status: 'dikumpulkan',
      file_lampiran: null,
      nilai: 85,
    },
    {
      id: '3',
      judul: 'Laporan Praktikum OOP',
      mapel: 'Pemrograman Berorientasi Objek',
      kelas: 'XI RPL 1',
      guru: 'Siti Rahmawati, M.Pd.',
      deskripsi: 'Laporan lengkap praktikum OOP meliputi: class diagram, source code, dan dokumentasi.',
      deadline: '2026-10-10T23:59:00',
      status: 'dinilai',
      file_lampiran: 'laporan-oop.docx',
      nilai: 92,
    },
    {
      id: '4',
      judul: 'Forum Diskusi: REST API',
      mapel: 'Pemrograman Web',
      kelas: 'XI RPL 1',
      guru: 'Budi Santoso, S.Kom.',
      deskripsi: 'Diskusi kelompok tentang konsep dan implementasi REST API. Minimal 1 postingan per siswa.',
      deadline: '2026-10-08T23:59:00',
      status: 'belum',
      file_lampiran: null,
      nilai: null,
    },
  ];

  const filteredTugas = tugas.filter(t => {
    const matchSearch = t.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       t.mapel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'semua' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: string, deadline: string) => {
    if (status === 'dinilai') return { variant: 'success', label: 'Dinilai', icon: CheckCircle2 };
    if (status === 'dikumpulkan') return { variant: 'info', label: 'Dikumpulkan', icon: CheckCircle2 };
    if (isDeadlinePassed(deadline)) return { variant: 'danger', label: 'Terlambat', icon: AlertCircle };
    return { variant: 'warning', label: 'Belum Dikumpulkan', icon: AlertCircle };
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-poppins">Tugas Saya</h1>
        <p className="text-gray-500 mt-1">Kelola dan kumpulkan tugas dari guru Anda</p>
      </div>

      {/* Filter & Search */}
      <Card className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari tugas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['semua', 'belum', 'dikumpulkan', 'dinilai'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tugas List */}
      {filteredTugas.length === 0 ? (
        <EmptyState
          title="Tugas tidak ditemukan"
          description="Tidak ada tugas yang sesuai dengan filter Anda"
          icon={<FileText size={48} className="text-gray-300" />}
        />
      ) : (
        <div className="space-y-4">
          {filteredTugas.map((t) => {
            const statusBadge = getStatusBadge(t.status, t.deadline);
            const { text: deadlineText, color: deadlineColor } = formatDeadline(t.deadline);
            const StatusIcon = statusBadge.icon;
            const badgeVariant = statusBadge.variant as 'secondary' | 'danger' | 'success' | 'warning' | 'info';

            return (
              <Card key={t.id} className="hover:border-primary/40 transition-all group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left: Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {t.judul}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="secondary" size="sm">{t.mapel}</Badge>
                          <Badge variant="info" size="sm">{t.kelas}</Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 ml-11">
                      {t.deskripsi}
                    </p>

                    {/* Guru & Deadline */}
                    <div className="text-xs text-gray-500 space-y-0.5 ml-11">
                      <p>👨‍🏫 {t.guru}</p>
                      <p className={`${deadlineColor} font-semibold`}>
                        📅 Deadline: {deadlineText}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status & Action */}
                  <div className="flex flex-col items-end gap-3 md:ml-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={badgeVariant} size="sm">
                        <StatusIcon size={12} className="mr-1" />
                        {statusBadge.label}
                      </Badge>
                    </div>

                    {/* Value if dinilai */}
                    {t.nilai !== null && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{t.nilai}</p>
                        <p className="text-xs text-gray-500 font-medium">Nilai Anda</p>
                      </div>
                    )}

                    {/* Action Button */}
                    {t.status === 'belum' ? (
                      <Button size="sm" variant="primary" icon={<ChevronRight size={16} />}>
                        Kumpulkan
                      </Button>
                    ) : t.status === 'dikumpulkan' ? (
                      <Button size="sm" variant="secondary" icon={<ChevronRight size={16} />}>
                        Lihat Status
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" icon={<ChevronRight size={16} />}>
                        Lihat Detail
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

