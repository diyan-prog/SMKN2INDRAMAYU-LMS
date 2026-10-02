export interface Kelas {
  id_kelas: string;
  nama_kelas: string;
  tingkat: 'X' | 'XI' | 'XII';
  jurusan: string;
  id_walikelas: string;
  tahun_ajaran: string;
  created_at: string;
}

export interface KelasWithWali extends Kelas {
  wali_kelas?: {
    id_user: string;
    nama_lengkap: string;
  };
}
