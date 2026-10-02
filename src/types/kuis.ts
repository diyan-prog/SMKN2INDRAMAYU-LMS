export interface Kuis {
  id_kuis: string;
  id_pengampu: string;
  judul: string;
  durasi_menit: number;
  waktu_mulai: string;
  waktu_selesai: string;
  status: 'draft' | 'aktif' | 'selesai';
  created_at: string;
}

export interface KuisWithDetails extends Kuis {
  nama_mapel: string;
  nama_kelas: string;
  nama_guru: string;
  jumlah_soal?: number;
  jumlah_peserta?: number;
}

export interface SoalKuis {
  id_soal: string;
  id_kuis: string;
  pertanyaan: string;
  pilihan_a: string;
  pilihan_b: string;
  pilihan_c: string;
  pilihan_d: string;
  kunci_jawaban: 'A' | 'B' | 'C' | 'D';
  poin: number;
  urutan?: number;
}

export interface HasilKuis {
  id_hasil: string;
  id_kuis: string;
  id_siswa: string;
  nilai: number;
  waktu_mulai: string;
  waktu_selesai: string;
  jawaban?: JawabanKuis[];
}

export interface HasilKuisWithSiswa extends HasilKuis {
  nama_siswa: string;
  nis: string;
}

export interface JawabanKuis {
  id_soal: string;
  jawaban: 'A' | 'B' | 'C' | 'D';
  benar: boolean;
}

export interface CreateKuisPayload {
  id_pengampu: string;
  judul: string;
  durasi_menit: number;
  waktu_mulai: string;
  waktu_selesai: string;
  soal: Omit<SoalKuis, 'id_soal' | 'id_kuis'>[];
}

export interface SubmitKuisPayload {
  id_kuis: string;
  jawaban: { id_soal: string; jawaban: 'A' | 'B' | 'C' | 'D' }[];
  waktu_mulai: string;
}
