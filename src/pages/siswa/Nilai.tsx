import { ArrowLeft, BookOpen, Clock, MapPin, Award, TrendingUp, Download, Search, FileText, CheckCircle, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SiswaNilai() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-4 space-y-4">
      {/* Breadcrumb */}
      <div className="p-3 bg-white rounded-xl shadow-sm border flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs">
          <Link to="/siswa/dashboard" className="flex items-center gap-1 text-blue-900 font-semibold hover:underline">
            <ArrowLeft size={12} />
            Kembali ke Kelas Saya
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-slate-600">Beranda</span>
          <span className="text-stone-300">/</span>
          <span className="text-slate-600">Kelas Saya</span>
          <span className="text-stone-300">/</span>
          <span className="text-gray-900 font-semibold">Pemrograman Web & Perangkat Bergerak</span>
        </div>
        <div className="px-2 py-1 bg-violet-100 rounded-full flex items-center gap-1.5">
          <div className="w-2 h-2 bg-blue-900 rounded-full" />
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">T.A. 2024/2025 • SEMESTER GENAP</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white rounded-xl shadow-sm border relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl" />
        <div className="relative space-y-4">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 bg-slate-200 rounded-full text-[10px] font-semibold text-blue-900 uppercase">PRODUKTIF KEJURUAN RPL</span>
                <span className="px-2.5 py-0.5 bg-indigo-100 rounded-full text-[10px] font-bold text-neutral-700">Kode: PWB-XII-RPL1</span>
                <span className="px-2.5 py-0.5 bg-blue-100 rounded-full text-[10px] font-bold text-slate-900">Kurikulum Merdeka SMK</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Pemrograman Web & Perangkat Bergerak</h1>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">AF</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ahmad Fauzi, S.Kom.</p>
                    <p className="text-[10px] font-bold text-slate-600">Guru Pengampu Utama</p>
                  </div>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <Clock size={14} className="text-blue-900" />
                  Senin, 07:30 - 09:45 WIB
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <MapPin size={14} className="text-amber-800" />
                  Lab Komputer RPL 2
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-2 bg-indigo-50 rounded-xl flex gap-2">
                <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-center">
                  <p className="text-[10px] font-bold text-slate-600">Presensi</p>
                  <p className="text-base font-bold text-blue-900">93%</p>
                </div>
                <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-center">
                  <p className="text-[10px] font-bold text-slate-600">Tugas</p>
                  <p className="text-base font-bold text-gray-900">4</p>
                </div>
                <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-center">
                  <p className="text-[10px] font-bold text-slate-600">Kuis</p>
                  <p className="text-base font-bold text-amber-800">3</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3.5 py-2 bg-indigo-100 rounded-lg flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                  <FileText size={14} />
                  Silabus & RPS
                </button>
                <button className="px-3.5 py-2 bg-blue-900 text-white rounded-lg shadow-sm flex items-center gap-1.5 text-xs font-semibold">
                  <BookOpen size={14} />
                  Lab Daring / Meet
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="pt-3 border-t border-indigo-100 flex gap-1 overflow-x-auto">
            <button className="px-4 py-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-gray-50 rounded">
              <BookOpen size={14} />
              Beranda Kelas
            </button>
            <button className="px-4 py-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-gray-50 rounded">
              <FileText size={14} />
              Materi (8 Modul)
            </button>
            <button className="px-4 py-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-gray-50 rounded">
              <FileText size={14} />
              Tugas (4 Tugas)
            </button>
            <button className="px-4 py-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-gray-50 rounded">
              <FileText size={14} />
              Kuis & Ujian (3)
            </button>
            <button className="px-4 py-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:bg-gray-50 rounded">
              <CheckCircle size={14} />
              Presensi (93%)
            </button>
            <button className="px-4 py-3 flex items-center gap-1.5 text-xs font-bold text-blue-900 border-b-2 border-blue-900">
              <Award size={14} />
              Nilai Saya (88.5)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Rata-Rata Capaian */}
        <div className="p-4 bg-white rounded-xl shadow-sm border space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <Award size={16} className="text-blue-900" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Rata-Rata Capaian</h3>
                <p className="text-xs text-slate-600">Semester Genap Berjalan</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-violet-100 rounded-full text-[10px] font-semibold text-blue-900">Predikat A</span>
          </div>
          
          <div className="flex items-center gap-6 py-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="#e0e7ff" strokeWidth="8" fill="none" />
                <circle cx="56" cy="56" r="48" stroke="#1e3a8a" strokeWidth="8" fill="none" 
                  strokeDasharray={`${(88.5/100) * 301.59} 301.59`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">88.5</span>
                <span className="text-[10px] font-bold text-slate-600">/ 100</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="px-2 py-1 bg-indigo-50 rounded flex items-center gap-1">
                <CheckCircle size={14} className="text-blue-900" />
                <span className="text-[10px] font-bold text-blue-900">Melampaui KKM (75.0)</span>
              </div>
              <p className="text-xs">
                <span className="text-neutral-700">Status Kelulusan: </span>
                <span className="text-blue-900 font-semibold">KOMPETEN</span>
              </p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600">
                <TrendingUp size={12} />
                Peringkat #3 dari 36 Siswa
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-indigo-100 flex justify-between text-[10px] font-bold">
            <span className="text-neutral-700">Target Kompetensi: 100% Tuntas</span>
            <span className="text-blue-900">+13.5 di atas KKM</span>
          </div>
        </div>

        {/* Bobot Penilaian */}
        <div className="p-4 bg-white rounded-xl shadow-sm border space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-gray-900">Bobot Penilaian SMK</h3>
            <span className="px-2 py-0.5 bg-violet-100 rounded text-[10px] font-bold text-slate-600">RPS 2024</span>
          </div>
          <p className="text-xs text-neutral-700">Struktur akumulasi rapor kurikulum kejuruan</p>
          
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-900">Praktik Lab / Jobsheet (25%)</span>
                <span className="text-blue-900">95.0</span>
              </div>
              <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-900 rounded-full" style={{width: '95%'}} />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-900">Tugas Terstruktur (30%)</span>
                <span className="text-gray-900">90.0</span>
              </div>
              <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-900 rounded-full" style={{width: '90%'}} />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-900">Kuis & Ulangan Harian (20%)</span>
                <span className="text-gray-900">87.5</span>
              </div>
              <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700 rounded-full" style={{width: '87.5%'}} />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-neutral-700">Ujian Tengah Semester (25%)</span>
                <span className="text-amber-800">24 Mar 2025</span>
              </div>
              <div className="h-2 bg-violet-100 rounded-full" />
            </div>
          </div>

          <div className="pt-2 border-t border-indigo-100 flex justify-between text-[10px] font-bold">
            <span className="text-slate-600">Standar KKM: 75.0</span>
            <span className="text-blue-900">Tercapai 3 / 4 Instrumen</span>
          </div>
        </div>
      </div>

      {/* Search & Filter & Table */}
      <div className="p-4 bg-white rounded-xl shadow-sm border space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 max-w-xl relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari riwayat penilaian..."
              className="w-full pl-10 pr-4 py-2 bg-indigo-50 border-0 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <button className="px-3.5 py-2 bg-violet-100 rounded-lg flex items-center gap-1.5 text-xs font-semibold text-gray-900">
            <Download size={14} />
            Ekspor (.PDF)
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button className="px-3.5 py-1.5 bg-blue-900 text-white rounded-full shadow-sm text-[10px] font-bold whitespace-nowrap">
            Semua Penilaian (7)
          </button>
          <button className="px-3.5 py-1.5 bg-indigo-50 rounded-full text-[10px] font-bold text-gray-900 whitespace-nowrap">
            Tugas Praktikum (4)
          </button>
          <button className="px-3.5 py-1.5 bg-indigo-50 rounded-full text-[10px] font-bold text-gray-900 whitespace-nowrap">
            Kuis & Evaluasi (3)
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-indigo-100 text-slate-600">
                <th className="py-2.5 px-3">Nama Penilaian</th>
                <th className="py-2.5 px-3">Jenis</th>
                <th className="py-2.5 px-3">Tanggal</th>
                <th className="py-2.5 px-3 text-right">Skor</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-50">
              {[
                { name: 'Jobsheet 1: Layouting & Widget Dasar', type: 'Praktikum', date: '05 Mar 2025', score: 95, status: 'Lulus' },
                { name: 'Kuis Teori Bab 1: State Management', type: 'Kuis', date: '03 Mar 2025', score: 88, status: 'Lulus' },
                { name: 'Jobsheet 2: Navigation & Routing', type: 'Praktikum', date: '28 Feb 2025', score: 92, status: 'Lulus' },
                { name: 'Tugas Mandiri: HTTP Dio Client', type: 'Tugas', date: '25 Feb 2025', score: 85, status: 'Lulus' },
                { name: 'Kuis Teori Bab 2: REST API JSON', type: 'Kuis', date: '20 Feb 2025', score: 80, status: 'Lulus' },
                { name: 'Jobsheet 3: Local SQLite Database', type: 'Praktikum', date: '15 Feb 2025', score: 98, status: 'Lulus' },
                { name: 'Tugas Kelompok: Final Project Mock', type: 'Tugas', date: '10 Feb 2025', score: 90, status: 'Lulus' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-indigo-50/50">
                  <td className="py-3 px-3 font-semibold text-gray-900">{item.name}</td>
                  <td className="py-3 px-3 text-slate-600">{item.type}</td>
                  <td className="py-3 px-3 text-slate-600">{item.date}</td>
                  <td className="py-3 px-3 text-right font-bold text-blue-900">{item.score}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full font-bold text-[9px]">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Target KKM */}
      <div className="p-4 bg-white rounded-xl shadow-sm border space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <Target size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Target KKM & LSP-P1</h3>
            <p className="text-xs text-slate-600">Skema Sertifikasi Rekayasa Perangkat Lunak</p>
          </div>
        </div>
        
        <div className="p-3 bg-indigo-50 rounded-xl space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-600">Nilai Kriteria Kelulusan (KKM):</span>
            <span className="text-gray-900 font-bold">75.0</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-600">Capaian Anda Saat Ini:</span>
            <span className="text-blue-900 font-bold">88.5 (+13.5 Poin)</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600">Status Kualifikasi LSP:</span>
            <span className="px-2 py-0.5 bg-violet-100 rounded text-[10px] font-semibold text-blue-900">REKOMENDASI LULUS</span>
          </div>
        </div>
        
        <p className="text-xs text-neutral-700 leading-relaxed">
          Siswa yang mempertahankan nilai rata-rata praktik di atas 85.0 secara otomatis memperoleh rekomendasi sertifikasi kompetensi Junior Mobile Programmer pada asesmen LSP-P1 SMKN 2 Indramayu.
        </p>
      </div>

      {/* Feedback */}
      <div className="p-4 bg-white rounded-xl shadow-sm border space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-blue-900" />
            <h3 className="text-base font-semibold text-gray-900">Umpan Balik Guru</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-600">01 Mar 2025</span>
        </div>
        
        <div className="p-3 bg-indigo-50 rounded-xl space-y-2">
          <p className="text-xs text-gray-900 leading-relaxed">
            "Menunjukkan pemahaman konsep clean architecture pada Flutter dengan sangat matang. Struktur folder modular dan penanganan async error di Jobsheet 2 layak dijadikan contoh untuk teman sekelas. Tingkatkan optimasi memori pada materi SQLite mendatang!"
          </p>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-600">— Ahmad Fauzi, S.Kom.</span>
            <div className="flex items-center gap-1">
              <Award size={12} className="text-blue-900" />
              <span className="text-[10px] font-bold text-blue-900">Apresiasi Kejuruan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
