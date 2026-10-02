// Role names
export const ROLE_LABELS: Record<string, string> = {
  guru: 'Guru',
  siswa: 'Siswa',
  walikelas: 'Wali Kelas',
  tatausaha: 'Tata Usaha',
  kepsek: 'Kepala Sekolah',
};

// Role permissions (routing)
export const ROLE_ROUTES: Record<string, string> = {
  guru: '/guru/dashboard',
  siswa: '/siswa/dashboard',
  walikelas: '/walikelas/dashboard',
  tatausaha: '/tatausaha/dashboard',
  kepsek: '/kepsek/dashboard',
};

// API base URL
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api';

// Status colors
export const STATUS_COLORS = {
  aktif: 'bg-green-100 text-green-800',
  nonaktif: 'bg-gray-100 text-gray-500',
  hadir: 'bg-green-100 text-green-800',
  izin: 'bg-yellow-100 text-yellow-800',
  sakit: 'bg-blue-100 text-blue-800',
  alpa: 'bg-red-100 text-red-800',
  dikumpulkan: 'bg-primary-light text-primary-dark',
  terlambat: 'bg-red-100 text-red-800',
  belum: 'bg-gray-100 text-gray-500',
  draft: 'bg-gray-100 text-gray-500',
  selesai: 'bg-blue-100 text-blue-800',
};

// Days of week
export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// Kelas levels
export const TINGKAT_KELAS = ['X', 'XI', 'XII'];

// Tahun ajaran options
export const TAHUN_AJARAN = [
  '2026/2027',
  '2025/2026',
  '2024/2025',
  '2023/2024',
];

// Jurusan options
export const JURUSAN_LIST = [
  'Rekayasa Perangkat Lunak (RPL)',
  'Teknik Komputer dan Jaringan (TKJ)',
  'Multimedia (MM)',
  'Akuntansi',
  'Administrasi Perkantoran (AP)',
  'Pemasaran',
];
