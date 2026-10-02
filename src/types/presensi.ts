export interface Presensi {
  id_presensi: string;
  id_pengampu: string;
  id_siswa: string;
  tanggal: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alpa';
  dicatat_oleh: string;
  created_at: string;
}

export interface PresensiWithDetails extends Presensi {
  nama_siswa: string;
  nis: string;
  nama_mapel: string;
  nama_kelas: string;
}

export interface RekapPresensi {
  id_siswa: string;
  nama_siswa: string;
  nis: string;
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  total_pertemuan: number;
  persentase_kehadiran: number;
}

export interface InputPresensiPayload {
  id_pengampu: string;
  tanggal: string;
  data_siswa: {
    id_siswa: string;
    status: 'hadir' | 'izin' | 'sakit' | 'alpa';
  }[];
}
