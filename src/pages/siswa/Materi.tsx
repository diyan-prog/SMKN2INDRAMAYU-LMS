import { useState } from 'react';
import { Search, Filter, Download, Eye, BookOpen, FileText, Video } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { BackButton } from '@/components/ui/BackButton';
import { formatDate } from '@/utils/formatDate';

export default function SiswaMateri() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMapel, setFilterMapel] = useState('semua');

  const materi = [
    {
      id: '1',
      judul: 'Pengenalan HTML5 dan Semantik',
      mapel: 'Pemrograman Web',
      kelas: 'XI RPL 1',
      guru: 'Budi Santoso, S.Kom.',
      tanggal: '2026-09-28',
      deskripsi: 'Pelajari dasar-dasar HTML5 termasuk struktur dokumen, elemen semantik, dan best practices...',
      file: 'html5-intro.pdf',
      video: 'https://youtube.com/watch?v=abc123',
      views: 142,
    },
    {
      id: '2',
      judul: 'CSS Modern: Flexbox & Grid',
      mapel: 'Pemrograman Web',
      kelas: 'XI RPL 1',
      guru: 'Budi Santoso, S.Kom.',
      tanggal: '2026-09-25',
      deskripsi: 'Master modern CSS techniques dengan Flexbox dan CSS Grid untuk layout yang responsif...',
      file: null,
      video: 'https://youtube.com/watch?v=def456',
      views: 198,
    },
    {
      id: '3',
      judul: 'Normalisasi Database',
      mapel: 'Basis Data',
      kelas: 'XII RPL 1',
      guru: 'Doni Hermawan, S.Kom.',
      tanggal: '2026-09-20',
      deskripsi: 'Pahami konsep normalisasi database dari 1NF hingga 3NF untuk design database yang optimal...',
      file: 'normalisasi-db.pdf',
      video: null,
      views: 87,
    },
    {
      id: '4',
      judul: 'Object-Oriented Programming Fundamentals',
      mapel: 'Pemrograman Berorientasi Objek',
      kelas: 'XI RPL 1',
      guru: 'Siti Rahmawati, M.Pd.',
      tanggal: '2026-09-22',
      deskripsi: 'Konsep dasar OOP: class, object, inheritance, polymorphism, dan encapsulation...',
      file: 'oop-fundamentals.pptx',
      video: 'https://youtube.com/watch?v=ghi789',
      views: 256,
    },
  ];

  const filteredMateri = materi.filter(m => {
    const matchSearch = m.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       m.mapel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterMapel === 'semua' || m.mapel === filterMapel;
    return matchSearch && matchFilter;
  });

  const mapelList = ['semua', ...new Set(materi.map(m => m.mapel))];

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-poppins">Materi Pembelajaran</h1>
        <p className="text-gray-500 mt-1">Akses semua materi pembelajaran dari guru Anda</p>
      </div>

      {/* Filter & Search */}
      <Card className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari materi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <div className="relative w-full md:w-48">
            <select
              value={filterMapel}
              onChange={(e) => setFilterMapel(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none text-sm font-medium text-gray-700"
            >
              {mapelList.map(mapel => (
                <option key={mapel} value={mapel}>
                  {mapel === 'semua' ? 'Semua Mata Pelajaran' : mapel}
                </option>
              ))}
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </Card>

      {/* Materi Grid */}
      {filteredMateri.length === 0 ? (
        <EmptyState
          title="Materi tidak ditemukan"
          description="Coba ubah pencarian atau filter Anda"
          icon={<BookOpen size={48} className="text-gray-300" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMateri.map((m) => (
            <Card key={m.id} className="hover:border-primary/40 hover:shadow-lg transition-all group cursor-pointer overflow-hidden">
              {/* Header Background */}
              <div className="h-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                <BookOpen size={32} className="text-primary/30" />
              </div>

              <div className="space-y-4">
                {/* Title & Meta */}
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors font-poppins text-base line-clamp-2">
                    {m.judul}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge variant="secondary" size="sm">{m.mapel}</Badge>
                    <Badge variant="info" size="sm">{m.kelas}</Badge>
                  </div>
                </div>

                {/* Deskripsi */}
                <p className="text-xs text-gray-600 line-clamp-2">
                  {m.deskripsi}
                </p>

                {/* Guru & Tanggal */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>👨‍🏫 {m.guru}</p>
                  <p>📅 {formatDate(m.tanggal, 'd MMM yyyy')}</p>
                </div>

                {/* File/Video Indicators */}
                <div className="flex items-center gap-2">
                  {m.file && (
                    <Badge variant="success" size="sm">
                      <FileText size={12} className="mr-1" /> File
                    </Badge>
                  )}
                  {m.video && (
                    <Badge variant="danger" size="sm">
                      <Video size={12} className="mr-1" /> Video
                    </Badge>
                  )}
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">👁 {m.views} views</span>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Lihat">
                      <Eye size={16} />
                    </button>
                    {m.file && (
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Download">
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

