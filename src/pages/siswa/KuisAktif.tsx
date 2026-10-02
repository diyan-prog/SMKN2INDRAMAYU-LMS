import { useState } from 'react';
import { ArrowLeft, ArrowRight, Flag, Server, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';

export default function KuisAktif() {
  const [selectedOption, setSelectedOption] = useState('B');

  return (
    <div className="w-full max-w-[1280px] p-6 flex flex-col gap-6 mx-auto">
      <BackButton />
      {/* Header Info */}
      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase rounded-full">ULANGAN HARIAN FORMAL</span>
            <span className="text-slate-600 text-xs">T.A. 2024/2025 • Semester Genap</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Kuis Harian 2: Arsitektur Flutter, State Management & REST API</h1>
          <div className="flex items-center gap-4 text-xs text-neutral-700">
            <span>📚 Pemrograman Web & Perangkat Bergerak</span>
            <span>•</span>
            <span>Guru Pengampu: Ahmad Fauzi, S.Kom.</span>
          </div>
        </div>
        
        {/* Timer */}
        <div className="px-4 py-2 bg-indigo-50 rounded-xl flex items-center gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 leading-none">34:18</div>
            <div className="text-[9px] font-semibold text-neutral-700 uppercase tracking-wide">SISA WAKTU</div>
          </div>
          <div className="text-xs text-slate-600 border-l pl-4">
            <div className="font-semibold text-gray-900">Waktu Berjalan</div>
            <div>Total: 45 Menit</div>
            <div className="text-blue-800 font-semibold flex items-center gap-1 mt-1"><Server size={10}/> Sinkron Server</div>
          </div>
        </div>
      </div>

      {/* Progress & Navigasi Nomor */}
      <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-gray-900">Soal 3 dari 10 <span className="font-normal text-neutral-700 ml-1">Pilihan Ganda</span></span>
          <span className="text-slate-600">Progres: <span className="text-blue-800 font-semibold">30%</span> (3 Terjawab, 7 Belum)</span>
        </div>
        <div className="w-full h-2 bg-violet-100 rounded-full overflow-hidden">
          <div className="w-[30%] h-full bg-blue-800 rounded-full" />
        </div>
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              className={`w-9 h-9 rounded-lg font-bold text-sm flex items-center justify-center transition ${
                num === 3 
                  ? 'bg-blue-700 text-white shadow-md ring-2 ring-blue-800/30' 
                  : num < 3 
                  ? 'bg-blue-800 text-white' 
                  : 'bg-violet-100 text-gray-900 hover:bg-violet-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Soal Content */}
      <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col gap-6">
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-blue-800 text-white rounded-full text-sm font-semibold">Soal Nomor 3</span>
          <span className="px-3 py-1 bg-violet-100 text-gray-900 rounded-full text-sm font-semibold">Bobot: 10 Poin</span>
        </div>
        
        <p className="text-base text-gray-900 font-semibold leading-relaxed">
          Pada arsitektur aplikasi Flutter yang mengonsumsi REST API, manakah pendekatan yang paling tepat untuk mendengarkan perubahan data dari class 
          <span className="mx-2 px-1.5 py-0.5 bg-indigo-100 text-blue-800 font-mono rounded font-bold">ChangeNotifier</span> 
          tanpa menyebabkan seluruh widget tree di-rebuild secara berlebihan?
        </p>

        {/* Snippet Kode */}
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-inner">
          <div className="px-4 py-2 bg-black/30 flex justify-between items-center text-xs text-indigo-50/70">
            <span>weather_view.dart (Snippet Context)</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white">Dart 3.x</span>
          </div>
          <pre className="p-5 text-xs text-indigo-50 font-mono overflow-x-auto">
{`Consumer<WeatherProvider>(
  builder: (context, weather, child) {
    return Text(weather.currentTemperature);
  },
);`}
          </pre>
        </div>

        {/* Pilihan Jawaban */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold text-neutral-700 uppercase tracking-wide">PILIH SALAH SATU OPSI TERBAIK:</span>
          {[
            { id: 'A', text: 'Menggunakan setState() di dalam method build() widget utama setiap kali respons HTTP diterima.' },
            { id: 'B', text: 'Membungkus widget target secara spesifik menggunakan Consumer<T> atau context.select() sehingga hanya bagian teks temperatur yang di-render ulang.' },
            { id: 'C', text: 'Memanggil notifyListeners() berulang kali di dalam loop asynchronous tanpa mendefinisikan generic type Provider.' },
            { id: 'D', text: 'Menyimpan seluruh instance model data ke dalam SharedPreferences sebelum memanggil widget tree.' }
          ].map((opt) => (
            <button 
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`p-5 rounded-xl flex items-start gap-4 text-left transition border ${
                selectedOption === opt.id 
                  ? 'bg-indigo-50 border-blue-800 shadow-sm' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0 ${
                selectedOption === opt.id ? 'bg-blue-800 text-white' : 'bg-violet-100 text-gray-900'
              }`}>
                {opt.id}
              </div>
              <span className={`text-sm flex-1 ${selectedOption === opt.id ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>
                {opt.text}
              </span>
            </button>
          ))}
        </div>

        {/* Footer Nav */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t gap-4">
          <Button variant="secondary" className="gap-2"><ArrowLeft size={16}/> Sebelumnya</Button>
          <Button variant="secondary" className="gap-2 text-neutral-700"><Flag size={16}/> Tandai Ragu-ragu</Button>
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2 text-blue-800">Selanjutnya <ArrowRight size={16}/></Button>
            <Button className="bg-blue-800 hover:bg-blue-700 text-white gap-2">Selesai & Kumpulkan</Button>
          </div>
        </div>
      </div>

      {/* Footer System */}
      <div className="p-4 bg-white rounded-xl border flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-blue-800 flex-shrink-0" size={16}/> 
          <span>Aktivitas tab dan browser dimonitor secara real-time. Dilarang berganti tab aplikasi atau jendela kerja.</span>
        </div>
        <div className="flex gap-4 font-semibold">
          <span className="text-blue-800 flex items-center gap-1"><div className="w-2 h-2 bg-blue-800 rounded-full"/> Cloud Sync OK</span>
          <span>Latency: 18ms</span>
        </div>
      </div>
    </div>
  );
}

