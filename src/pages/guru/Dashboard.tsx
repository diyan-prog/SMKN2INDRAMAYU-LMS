import { Calendar, Clock, Users, BarChart3, ChevronRight, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BackButton } from '@/components/ui/BackButton';
import { useAuth } from '@/contexts/AuthContext';

export default function GuruDashboard() {
  const { userProfile } = useAuth();

  const jadwalHariIni = [
    { time: '07:30 - 09:45', class: 'XI RPL 1', subject: 'Pemrograman Web', room: 'Lab RPL 1', siswa: 36 },
    { time: '10:00 - 12:15', class: 'XII RPL 1', subject: 'Basis Data', room: 'Lab RPL 2', siswa: 32 },
    { time: '13:00 - 15:15', class: 'X RPL 1', subject: 'Dasar Desain Grafis', room: 'Ruang 10', siswa: 35 },
  ];

  const tugasMasuk = [
    { title: 'Tugas CRUD PHP', class: 'XI RPL 1', count: 24, total: 36, progress: 67 },
    { title: 'E-R Diagram', class: 'XII RPL 1', count: 12, total: 32, progress: 38 },
    { title: 'Tipografi Lanjut', class: 'X RPL 1', count: 5, total: 35, progress: 14 },
  ];

  const kelasList = [
    { name: 'XI RPL 1 - Pemrograman Web', siswa: 36, materi: 12, tugas: 8, kuis: 3, kehadiran: 92 },
    { name: 'XII RPL 1 - Basis Data', siswa: 32, materi: 10, tugas: 6, kuis: 2, kehadiran: 88 },
    { name: 'X RPL 1 - Dasar Desain', siswa: 35, materi: 8, tugas: 5, kuis: 2, kehadiran: 85 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <BackButton />
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold font-poppins">Selamat datang, {userProfile?.nama_lengkap}! 👋</h1>
        <p className="text-blue-50 text-sm mt-1">
          Kelola pembelajaran dengan efektif melalui dashboard guru SMK Negeri 2 Indramayu.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Mata Pelajaran</p>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Total Siswa</p>
            <p className="text-2xl font-bold text-gray-900">103</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Jam Mengajar</p>
            <p className="text-2xl font-bold text-gray-900">18 Jam</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <BarChart3 size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Rata-rata Nilai</p>
            <p className="text-2xl font-bold text-gray-900">82.5</p>
          </div>
        </Card>
      </div>

      {/* 2 Kolom Layout (Kiri 380px, Kanan Flex-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        
        {/* KOLOM KIRI */}
        <div className="space-y-6">
          
          {/* A. Jadwal Mengajar Hari Ini */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 font-poppins flex items-center gap-2">
                <Calendar size={18} className="text-primary" /> Jadwal Hari Ini
              </h3>
              <span className="text-xs text-gray-400 font-medium">1 Okt 2026</span>
            </div>

            <div className="space-y-3">
              {jadwalHariIni.map((jadwal, i) => (
                <div key={i} className="p-3 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="success" size="sm">{jadwal.time}</Badge>
                        <span className="text-[10px] text-gray-400 font-medium">{jadwal.room}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{jadwal.subject}</h4>
                      <p className="text-xs text-gray-600 mt-1">{jadwal.class} • {jadwal.siswa} Siswa</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* B. Tugas Masuk (Belum Dinilai) */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 font-poppins flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-500" /> Tugas Masuk
              </h3>
              <Badge variant="warning" size="sm">15 Pending</Badge>
            </div>

            <div className="space-y-3">
              {tugasMasuk.map((tugas, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 text-xs">{tugas.title}</span>
                    <span className="text-xs font-bold text-amber-600">{tugas.count}/{tugas.total}</span>
                  </div>
                  <ProgressBar value={tugas.count} max={tugas.total} size="sm" showPercentage={false} color="warning" />
                  <p className="text-[10px] text-gray-500 font-medium uppercase">{tugas.class}</p>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* KOLOM KANAN */}
        <div className="space-y-6">
          
          {/* C. Daftar Kelas dengan Statistik */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 font-poppins">Kelas yang Diampu</h2>
              <button className="text-primary text-sm font-medium flex items-center hover:underline">
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kelasList.map((kelas, i) => (
                <Card key={i} className="hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors font-poppins text-sm">
                        {kelas.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="info" size="sm">
                          <Users size={12} className="mr-0.5" /> {kelas.siswa} Siswa
                        </Badge>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-4 gap-2 bg-gray-50 p-2.5 rounded-xl">
                      <div className="text-center p-2">
                        <p className="text-lg font-bold text-blue-600">{kelas.materi}</p>
                        <p className="text-[10px] text-gray-600 font-medium mt-0.5">Materi</p>
                      </div>
                      <div className="text-center p-2 border-l border-gray-200">
                        <p className="text-lg font-bold text-blue-600">{kelas.tugas}</p>
                        <p className="text-[10px] text-gray-600 font-medium mt-0.5">Tugas</p>
                      </div>
                      <div className="text-center p-2 border-l border-gray-200">
                        <p className="text-lg font-bold text-amber-600">{kelas.kuis}</p>
                        <p className="text-[10px] text-gray-600 font-medium mt-0.5">Kuis</p>
                      </div>
                      <div className="text-center p-2 border-l border-gray-200">
                        <p className="text-lg font-bold text-primary">{kelas.kehadiran}%</p>
                        <p className="text-[10px] text-gray-600 font-medium mt-0.5">Hadir</p>
                      </div>
                    </div>

                    {/* Progress Bar Kehadiran */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600 font-medium">Kehadiran Kelas</span>
                        <span className="font-bold text-primary">{kelas.kehadiran}%</span>
                      </div>
                      <ProgressBar value={kelas.kehadiran} max={100} size="sm" showPercentage={false} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 p-4 flex items-start gap-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-800">Manfaatkan Fitur LMS Sebaik Mungkin</h4>
          <p className="text-sm text-gray-700 mt-1">
            Upload materi secara rutin, berikan tugas yang terstruktur, dan pantau perkembangan siswa Anda dengan dashboard yang komprehensif.
          </p>
        </div>
      </Card>
    </div>
  );
}

