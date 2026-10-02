<<<<<<< HEAD
# ClassIn LMS – SMK Negeri 2 Indramayu

Learning Management System berbasis React + Vite + TypeScript + Tailwind CSS untuk SMK Negeri 2 Indramayu.

## 🚀 Fitur

### Role-Based Access
- **Guru**: Dashboard, Materi, Tugas, Kuis, Presensi, Nilai
- **Siswa**: Dashboard, Materi, Tugas Saya, Kuis, Nilai Saya
- **Wali Kelas**: Rekap Nilai, Rekap Kehadiran
- **Tata Usaha**: Data Master (Siswa, Guru, Kelas, Mapel)
- **Kepala Sekolah**: Statistik & Laporan

### Core Features
- JWT Authentication & Protected Routes
- CRUD Materi (upload file & link video)
- CRUD Tugas (deadline tracking, pengumpulan, penilaian)
- Kuis dengan timer & auto‑scoring
- Input presensi per mata pelajaran
- Rekap nilai & kehadiran + export Excel/PDF
- UI responsif dengan Tailwind CSS + design system
- State management dengan Zustand
- Type‑safe TypeScript

## 📦 Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS 3 + PostCSS
- **Routing**: React Router DOM v6
- **State**: Zustand
- **HTTP**: Axios with interceptors
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Dates**: date-fns (format Indonesia)
- **Backend (Opsional)**: Node.js + Express + MySQL

## 🗂️ Struktur Folder

```
smkn2indramayu/
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Sidebar, ProtectedRoute
│   │   ├── ui/            # Button, Card, Input, Modal, Table, Badge, dll
│   │   └── shared/        # StatCard, KelasCard, JadwalCard
│   ├── pages/
│   │   ├── auth/          # Login
│   │   ├── guru/          # Dashboard, Materi, Tugas, Kuis, Presensi, Nilai
│   │   ├── siswa/         # Dashboard, Materi, Tugas, Kuis, Nilai
│   │   ├── walikelas/     # Rekap Nilai & Kehadiran
│   │   ├── tatausaha/     # Data Master
│   │   └── kepsek/        # Statistik & Laporan
│   ├── services/          # API services (Axios)
│   ├── store/             # Zustand stores (auth, ui)
│   ├── hooks/             # useAuth, useRole
│   ├── types/             # TypeScript interfaces
│   └── utils/             # constants, formatDate, roleHelper
├── server/                 # Backend API (opsional)
├── public/
└── package.json
```

## 🎨 Design System

- **Primary Color**: `#16A34A` (Green‑600) – header, button, aksen
- **Primary Dark**: `#15803D` (hover state)
- **Accent**: `#F59E0B` (Amber) – deadline, warning
- **Danger**: `#EF4444` (Red) – overdue, error
- **Font**: Inter + Poppins (Google Fonts)
- **Border Radius**: 12px (card), 8px (button/input)
- **Shadow**: `0 1px 3px rgba(0,0,0,0.08)`

## 🔧 Setup & Instalasi

1. **Clone & Install**
   ```bash
   git clone <repository>
   cd smkn2indramayu
   npm install
   ```

2. **Environment Variables**
   ```bash
   # Buat file .env sesuai .env.example
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`

4. **Build untuk Production**
   ```bash
   npm run build
   npm run preview
   ```

## 📊 Database Schema (11 Tabel)

1. `users` – id_user, nama_lengkap, email, username, password, role, nip_nis, foto_profil, status
2. `kelas` – id_kelas, nama_kelas, tingkat, jurusan, id_walikelas, tahun_ajaran
3. `mata_pelajaran` – id_mapel, kode_mapel, nama_mapel, id_guru
4. `pengampu_mapel` – id_pengampu, id_guru, id_mapel, id_kelas, hari, jam_mulai, jam_selesai
5. `materi` – id_materi, id_pengampu, judul, deskripsi, file_materi, link_video, tanggal_upload
6. `tugas` – id_tugas, id_pengampu, judul, deskripsi, file_lampiran, deadline, created_at
7. `pengumpulan_tugas` – id_pengumpulan, id_tugas, id_siswa, file_jawaban, catatan_siswa, waktu_kumpul, status, nilai, feedback_guru
8. `kuis` – id_kuis, id_pengampu, judul, durasi_menit, waktu_mulai, waktu_selesai, status
9. `soal_kuis` – id_soal, id_kuis, pertanyaan, pilihan_a..pilihan_d, kunci_jawaban, poin
10. `hasil_kuis` – id_hasil, id_kuis, id_siswa, nilai, waktu_selesai
11. `presensi` – id_presensi, id_pengampu, id_siswa, tanggal, status, dicatat_oleh, created_at

## 🔐 Login Demo

Untuk demo tanpa backend, gunakan credentials berikut:

|Test login kredensial:
-Siswa: ahmadf / password123
ahmad.fauzi@student.smkn2indramayu.sc
passwordbaru123
Guru: budisnt / password123
Wali Kelas: sitirahma / password123
Tata Usaha: tatausaha / password123
Kepala Sekolah: kepsek / password123

## 🧑‍💻 Development Notes

- **TypeScript Strict Mode**: Aktif, semua types sudah didefinisikan.
- **Komponen UI**: Reusable, terstruktur di `src/components/ui/`.
- **State Management**: Gunakan `useAuthStore` dan `useUIStore`.
- **Form Validation**: React Hook Form + Zod schema.
- **API Layer**: Axios instance dengan JWT interceptors.
- **Error Handling**: Global interceptors untuk 401 logout.
- **Responsive**: Mobile‑first dengan Tailwind.

## 📝 To Do (Next Features)

- [ ] Fitur Kuis dengan Timer & Auto‑Scoring
- [ ] Halaman Presensi Guru
- [ ] Rekap Nilai + Export Excel/PDF
- [ ] Upload file materi & jawaban
- [ ] Real‑time notifications (WebSocket)
- [ ] Backend Express.js + MySQL
- [ ] Unit Testing dengan Vitest
- [ ] Deployment ke Vercel/Netlify

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi dan pengembangan SMK Negeri 2 Indramayu.

---

**"Unggul dalam Prestasi, Berkarakter dalam Budaya"**  
SMK Negeri 2 Indramayu



=======
# SMKN2INDRAMAYU-LMS
>>>>>>> 1fff1c1d416314056c002645c78270cadadb8bde
