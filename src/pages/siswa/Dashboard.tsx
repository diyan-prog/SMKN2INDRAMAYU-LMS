import { useState } from 'react';
import { 
  Calendar, 
  Search, 
  ChevronDown, 
  Clock, 
  User,
  Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BackButton } from '@/components/ui/BackButton';
import { useAuth } from '@/contexts/AuthContext';

export default function SiswaDashboard() {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'akademik' | 'personal'>('akademik');
  const [selectedDay, setSelectedDay] = useState('Sen');

  const days = [
    { day: 'Sen', date: '05' },
    { day: 'Sel', date: '06' },
    { day: 'Rabu', date: '07' },
    { day: 'Kamis', date: '08' },
    { day: 'Jum', date: '09' },
    { day: 'Sab', date: '10' },
  ];

  const kelasList = [
    {
      id: '1',
      title: 'PROYEK 1',
      code: '23',
      prodi: 'Rekayasa Perangkat Lunak',
      jenis: 'Kelas Akademik',
      dosen: 'Budi Santoso, S.Kom.',
      dosenLain: 'dan 1 lainnya',
      jadwal: 'Senin, 07:30 - 09:45',
      jadwalLain: 'dan 1 lainnya',
      progress: 88,
    },
    {
      id: '2',
      title: 'BASIS DATA LANJUT',
      code: '15',
      prodi: 'Rekayasa Perangkat Lunak',
      jenis: 'Kelas Akademik',
      dosen: 'Doni Hermawan, S.Kom.',
      dosenLain: 'dan 1 lainnya',
      jadwal: 'Selasa, 10:00 - 12:15',
      jadwalLain: '',
      progress: 75,
    },
    {
      id: '3',
      title: 'PEMROGRAMAN BERORIENTASI OBJEK',
      code: '19',
      prodi: 'Rekayasa Perangkat Lunak',
      jenis: 'Kelas Akademik',
      dosen: 'Siti Rahmawati, M.Pd.',
      dosenLain: '',
      jadwal: 'Rabu, 13:00 - 15:15',
      jadwalLain: 'dan 1 lainnya',
      progress: 92,
    },
    {
      id: '4',
      title: 'MATEMATIKA TERAPAN',
      code: '10',
      prodi: 'Teknik Komputer & Jaringan',
      jenis: 'Kelas Akademik',
      dosen: 'Heri Supriyanto, S.Pd.',
      dosenLain: '',
      jadwal: 'Kamis, 08:00 - 10:00',
      jadwalLain: '',
      progress: 64,
    },
  ];

  const perluDikerjakan = [
    {
      title: 'Tugas CRUD PHP & MySQL',
      kelas: 'PROYEK 1',
      deadline: 'Besok, 23:59 WIB',
      urgent: true,
    },
    {
      title: 'Quiz Normalisasi Database',
      kelas: 'BASIS DATA LANJUT',
      deadline: '8 Okt 2026, 15:00',
      urgent: false,
    },
    {
      title: 'Laporan Praktikum OOP',
      kelas: 'PEMROGRAMAN BERORIENTASI OBJEK',
      deadline: '10 Okt 2026, 23:59',
      urgent: false,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <BackButton />
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins">Halo, {userProfile?.nama_lengkap} 👋</h1>
          <p className="text-blue-50 text-sm mt-1">
            Selamat datang di portal pembelajaran digital SMK Negeri 2 Indramayu. Tetap semangat raih prestasi!
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 flex items-center gap-3">
          <Calendar className="text-blue-200" size={20} />
          <div className="text-left">
            <p className="text-xs text-blue-100">Tahun Ajaran</p>
            <p className="text-sm font-semibold">2026/2027 Ganjil</p>
          </div>
        </div>
      </div>

      {/* 2 Column Layout (Kiri 380px, Kanan Flex-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        
        {/* KOLOM KIRI */}
        <div className="space-y-6">
          
          {/* A. Card "Jadwal Minggu Ini" */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 font-poppins flex items-center gap-2">
                <Calendar size={18} className="text-primary" /> Jadwal Minggu Ini
              </h3>
              <span className="text-xs text-gray-500 font-medium">Oktober 2026</span>
            </div>

            {/* Date Strip */}
            <div className="grid grid-cols-6 gap-1 bg-gray-50 p-1.5 rounded-xl">
              {days.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`flex flex-col items-center py-2 rounded-lg transition-all ${
                    selectedDay === item.day
                      ? 'bg-primary text-white shadow-sm'
                      : 'hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <span className="text-[10px] uppercase font-semibold">{item.day}</span>
                  <span className="text-sm font-bold mt-0.5">{item.date}</span>
                </button>
              ))}
            </div>

            {/* Jadwal Item */}
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="success" size="sm">07:30 - 09:45</Badge>
                  <span className="text-xs text-gray-400 font-medium">Lab RPL 1</span>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Pemrograman Web (PROYEK 1)</h4>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <User size={12} /> Budi Santoso, S.Kom. dan 1 lainnya
                </p>
              </div>

              <div className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="info" size="sm">10:00 - 12:15</Badge>
                  <span className="text-xs text-gray-400 font-medium">Lab Komputer</span>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Basis Data Lanjut</h4>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <User size={12} /> Doni Hermawan, S.Kom.
                </p>
              </div>
            </div>
          </Card>

          {/* B. Card "Perlu Dikerjakan" */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 font-poppins flex items-center gap-2">
                <Clock size={18} className="text-amber-500" /> Perlu Dikerjakan
              </h3>
              <Badge variant="warning" size="sm">{perluDikerjakan.length} Pending</Badge>
            </div>

            <div className="space-y-3">
              {perluDikerjakan.map((item, i) => (
                <div key={i} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-2 hover:border-gray-200 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-800 text-xs leading-snug">{item.title}</h4>
                    {item.urgent && <Badge variant="danger" size="sm">Urgent</Badge>}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium text-gray-600">{item.kelas}</span>
                    <span className={item.urgent ? 'text-danger font-semibold' : 'text-amber-600 font-medium'}>
                      {item.deadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* KOLOM KANAN */}
        <div className="space-y-6">
          
          {/* C & D. Tabs & Filter Bar */}
          <Card className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Tabs */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('akademik')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'akademik'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Kelas Akademik
                </button>
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'personal'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Kelas Personal
                </button>
              </div>

              {/* Filter / Tahun Ajaran */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <input
                    type="text"
                    placeholder="Cari kelas..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                  <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 appearance-none pr-8">
                    <option>2026 Ganjil</option>
                    <option>2025 Genap</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </Card>

          {/* E. Grid 2 Kolom Kelas Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kelasList.map((kelas) => (
              <Card key={kelas.id} className="hover:border-primary/40 transition-all cursor-pointer group flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Header Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-primary transition-colors font-poppins">
                        {kelas.title} <span className="text-gray-400 font-normal">({kelas.code})</span>
                      </h3>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{kelas.prodi}</p>
                    </div>
                    <Badge variant="secondary" size="sm">{kelas.jenis}</Badge>
                  </div>

                  {/* Dosen & Jadwal Info */}
                  <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-primary shrink-0" />
                      <span className="font-medium text-gray-800">{kelas.dosen}</span>
                      {kelas.dosenLain && (
                        <span className="text-gray-400 text-[11px]">{kelas.dosenLain}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary shrink-0" />
                      <span>{kelas.jadwal}</span>
                      {kelas.jadwalLain && (
                        <span className="text-gray-400 text-[11px]">{kelas.jadwalLain}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Kehadiran */}
                <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Progress Kehadiran</span>
                    <span className="font-bold text-primary">{kelas.progress}%</span>
                  </div>
                  <ProgressBar value={kelas.progress} max={100} size="sm" showPercentage={false} />
                </div>
              </Card>
            ))}
          </div>

        </div>

      </div>

      {/* F. Floating Toast / Banner Info */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary text-white rounded-xl shadow-md">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800">Tips Pembelajaran Edlink Style</h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Selesaikan aktivitas, kumpulkan poin presensi, dan raih posisi puncak di leaderboard SMK Negeri 2 Indramayu!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

