import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ChevronRight, CheckCircle2, Search as SearchIcon, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';

export default function Kuis() {
  const [filter, setFilter] = useState<'semua' | 'belum' | 'selesai'>('semua');

  return (
    <div className="w-full max-w-[1280px] p-6 flex flex-col gap-6 mx-auto">
      <div className="flex justify-between items-center">
        <BackButton />
        <div className="px-3 py-1 bg-violet-100 rounded-full flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
          <span className="w-3 h-3 bg-blue-800 rounded-sm inline-block" />
          <span>T.A. 2024/2025 • Semester Genap</span>
        </div>
      </div>

      {/* Hero Banner Kelas */}
      <div className="px-6 py-6 bg-white rounded-xl shadow-sm border flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[672px] flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-blue-700 text-white text-[10px] font-bold uppercase rounded-full">PRODUKTIF KEJURUAN RPL</span>
            <span className="px-2.5 py-1 bg-violet-100 text-slate-600 text-[10px] font-bold rounded-full">KODE: PWB-XII-RPL1</span>
            <span className="px-2.5 py-1 bg-violet-100 text-slate-600 text-[10px] font-semibold rounded-full">Kurikulum Merdeka SMK</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Pemrograman Web & Perangkat Bergerak</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <img src="https://placehold.co/28x28" className="w-7 h-7 rounded-full shadow-sm" alt="Guru" />
              <span className="font-bold text-gray-900">Ahmad Fauzi, S.Kom.</span>
            </div>
            <span>•</span>
            <span>Guru Pengampu</span>
            <span>•</span>
            <span>Senin, 07:30 - 09:45 WIB</span>
            <span>•</span>
            <span className="text-amber-800 font-semibold">Lab Komputer RPL 2</span>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
          <div className="p-2 bg-indigo-50 rounded-xl flex items-center gap-2">
            <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-center">
              <div className="text-[10px] font-semibold text-slate-600 uppercase">PRESENSI</div>
              <div className="text-blue-800 text-base font-bold">93%</div>
              <div className="text-[10px] text-slate-600">13/14 Hadir</div>
            </div>
            <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-center">
              <div className="text-[10px] font-semibold text-slate-600 uppercase">TUGAS</div>
              <div className="text-gray-900 text-base font-bold">4</div>
              <div className="text-[10px] text-slate-600">Total Modul</div>
            </div>
            <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-center">
              <div className="text-[10px] font-semibold text-amber-800 uppercase">KUIS</div>
              <div className="text-amber-800 text-base font-bold">3</div>
              <div className="text-[10px] text-amber-800">1 Aktif</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Silabus & RPS</Button>
            <Button className="bg-blue-800 hover:bg-blue-700 text-white" size="sm">Lab Daring / Meet</Button>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri & Tengah (2 span) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Proctoring Banner */}
          <div className="p-4 bg-indigo-100 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-800">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Proctoring & Integritas Ujian Aktif</h4>
                <p className="text-xs text-slate-600">Sistem Safe Exam Browser, proteksi multi-tab, dan logging aktivitas waktu nyata aktif.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-violet-100 text-blue-800 text-[10px] font-bold rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-800 rounded-full animate-pulse" /> SIAP-SEB v3.2
            </span>
          </div>

          {/* Filter & Search */}
          <div className="p-4 bg-white rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative flex-1 w-full">
              <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari kuis, topik evaluasi, atau ulangan harian..." 
                className="w-full pl-9 pr-4 py-2 bg-indigo-50 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
            <div className="flex gap-1.5 w-full md:w-auto overflow-x-auto">
              <button onClick={() => setFilter('semua')} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap ${filter === 'semua' ? 'bg-blue-800 text-white' : 'bg-indigo-50 text-slate-600'}`}>Semua Kuis (3)</button>
              <button onClick={() => setFilter('belum')} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap ${filter === 'belum' ? 'bg-blue-800 text-white' : 'bg-indigo-50 text-slate-600'}`}>Belum Dikerjakan (1)</button>
              <button onClick={() => setFilter('selesai')} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap ${filter === 'selesai' ? 'bg-blue-800 text-white' : 'bg-indigo-50 text-slate-600'}`}>Sudah Selesai (2)</button>
            </div>
          </div>

          {/* List Kuis Item 1: Belum Dikerjakan */}
          <div className="p-6 bg-white rounded-xl shadow-sm border relative overflow-hidden flex flex-col gap-4 border-l-4 border-l-amber-500">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-violet-100 text-slate-600 text-[10px] font-bold rounded-full">Kuis Harian 2</span>
                  <span className="px-2.5 py-0.5 bg-rose-200 text-amber-900 text-[10px] font-bold rounded-full">Batas Waktu: 2 Hari Lagi</span>
                  <span className="px-2 py-0.5 bg-indigo-100 text-slate-600 text-[10px] font-semibold rounded-full">1 Kesempatan Pengerjaan</span>
                </div>
                <h3 className="text-base font-bold text-gray-900">Arsitektur Flutter, State Management & REST API</h3>
              </div>
              <span className="px-3 py-1 bg-violet-100 text-slate-600 text-[10px] font-semibold rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 bg-amber-600 rounded-full" /> Belum Dikerjakan
              </span>
            </div>

            <div className="p-2 bg-indigo-50 rounded-lg flex flex-wrap justify-between gap-2 text-xs">
              <span className="text-slate-600">Durasi: <strong className="text-gray-900">45 Menit</strong></span>
              <span className="text-slate-600">Soal: <strong className="text-gray-900">20 Pilihan Ganda</strong></span>
              <span className="text-slate-600">Tutup: <strong className="text-amber-800">Kamis, 13 Mar 23:59</strong></span>
            </div>

            <p className="text-xs text-neutral-700 leading-relaxed">
              Evaluasi pemahaman konsep provider, Consumer widget, asynchronous execution, penanganan HTTP status code, parsing JSON response, serta implementasi SQLite local caching untuk aplikasi mobile kasir/inventaris toko.
            </p>

            <div className="p-3 bg-violet-100 rounded-lg text-xs text-slate-600 flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-amber-800 flex-shrink-0 mt-0.5" />
              <span>Pastikan jaringan internet stabil di Lab/Rumah. Begitu Anda menekan tombol <strong>Mulai Kerjakan</strong>, timer 45 menit akan langsung berjalan tanpa jeda.</span>
            </div>

            <div className="pt-2 flex justify-between items-center border-t">
              <span className="text-xs font-semibold text-blue-800 flex items-center gap-1">📖 Petunjuk Lengkap & Kisi-kisi Pengerjaan</span>
              <Link to="/siswa/kuis-aktif">
                <Button className="bg-blue-800 hover:bg-blue-700 text-white gap-2 text-xs">
                  Mulai Kerjakan Kuis <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </div>

          {/* List Kuis Item 2: Selesai */}
          <div className="p-6 bg-white rounded-xl shadow-sm border relative overflow-hidden flex flex-col gap-4 border-l-4 border-l-blue-800">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-violet-100 text-slate-600 text-[10px] font-bold rounded-full">Kuis Harian 1</span>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> Sudah Selesai
                  </span>
                  <span className="text-xs text-slate-500">Dikerjakan: 20 Feb 2025 (32 Menit)</span>
                </div>
                <h3 className="text-base font-bold text-gray-900">Dasar Dart & Widget Lifecycle Flutter</h3>
              </div>
              <div className="px-4 py-2 bg-indigo-50 rounded-xl flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-slate-600 uppercase">SKOR AKHIR</div>
                  <div className="text-blue-800 text-xl font-bold">85 <span className="text-xs font-normal text-slate-600">/ 100</span></div>
                </div>
                <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">A</div>
              </div>
            </div>

            <div className="p-2 bg-indigo-50 rounded-lg flex justify-around text-xs">
              <span className="text-slate-600">Benar: <strong className="text-gray-900">21 Soal</strong></span>
              <span className="text-slate-600">Salah: <strong className="text-red-600">4 Soal</strong></span>
              <span className="text-slate-600">Akurasi: <strong className="text-blue-800">84%</strong></span>
              <span className="text-slate-600">Predikat: <strong className="text-gray-900">Sangat Memuaskan</strong></span>
            </div>

            <div className="pt-1 flex justify-end gap-2">
              <Button variant="secondary" size="sm" className="text-xs">Unduh Hasil Nilai (PDF)</Button>
              <Button variant="secondary" size="sm" className="text-xs bg-violet-100 text-gray-900">Lihat Pembahasan & Review Jawaban</Button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (Sidebar 1 span) */}
        <div className="flex flex-col gap-6">
          {/* Progres Kuis Kelas */}
          <div className="p-4 bg-white rounded-xl shadow-sm border flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-gray-900">Progres Kuis Kelas</h4>
              <span className="px-2 py-0.5 bg-violet-100 text-slate-600 text-[10px] font-bold rounded-full">XII RPL 1</span>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-800">67%</div>
              <div>
                <div className="text-[10px] font-semibold text-slate-600 uppercase">RATA-RATA KUIS</div>
                <div className="text-xl font-bold text-blue-800">87.5 <span className="text-xs font-normal text-slate-600">/ 100</span></div>
                <div className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 bg-blue-800 rounded-full" /> 2 dari 3 Kuis Selesai
                </div>
              </div>
            </div>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Target KKM:</span>
                <span className="font-bold text-gray-900">75.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Peringkat di Kelas:</span>
                <span className="font-bold text-blue-800">#4 dari 36 Siswa</span>
              </div>
            </div>
          </div>

          {/* Tata Tertib */}
          <div className="p-4 bg-white rounded-xl shadow-sm border flex flex-col gap-3">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle size={18} className="text-blue-800" /> Tata Tertib Evaluasi Daring
            </h4>
            <p className="text-xs text-slate-600">Standar Operasional Penilaian Daring SMK Negeri 2 Indramayu:</p>
            <ul className="text-xs space-y-2 text-neutral-700">
              <li>• <strong>Kamera & Proctoring:</strong> Wajib aktifkan feed webcam jika diinstruksikan.</li>
              <li>• <strong>Deteksi Tab:</strong> Pindah tab lebih dari 3 kali mengunci lembar jawaban permanen.</li>
              <li>• <strong>Timer Server-Side:</strong> Timer terus berjalan meski koneksi terputus.</li>
            </ul>
          </div>

          {/* Agenda Akademik */}
          <div className="p-4 bg-violet-100 rounded-xl shadow-sm flex flex-col gap-3">
            <span className="px-2 py-0.5 bg-white text-slate-600 text-[10px] font-bold rounded-full w-max">Agenda Akademik</span>
            <h4 className="font-bold text-gray-900">Penilaian Tengah Semester (PTS) Genap</h4>
            <p className="text-xs text-slate-600">Ujian Teori & Praktik Coding Mobile diselenggarakan serentak:</p>
            <div className="p-2.5 bg-white rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex flex-col items-center justify-center font-bold text-gray-900">
                <span className="text-[10px] text-slate-600 uppercase">MAR</span>
                <span>24</span>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Senin, 24 Maret 2025</div>
                <div className="text-[10px] text-slate-600 font-bold">08:00 - 10:00 WIB • CBT Center SMK 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

