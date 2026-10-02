export interface Tugas {
  id_tugas: string;
  id_pengampu: string;
  judul: string;
  deskripsi: string;
  file_lampiran?: string;
  deadline: string;
  created_at: string;
}

export interface TugasWithDetails extends Tugas {
  nama_mapel: string;
  nama_kelas: string;
  nama_guru: string;
  jumlah_pengumpulan?: number;
  jumlah_siswa?: number;
}

export interface PengumpulanTugas {
  id_pengumpulan: string;
  id_tugas: string;
  id_siswa: string;
  file_jawaban?: string;
  catatan_siswa?: string;
  waktu_kumpul: string;
  status: 'dikumpulkan' | 'terlambat' | 'belum';
  nilai?: number;
  feedback_guru?: string;
}

export interface PengumpulanWithSiswa extends PengumpulanTugas {
  nama_siswa: string;
  nis: string;
}

export interface CreateTugasPayload {
  id_pengampu: string;
  judul: string;
  deskripsi: string;
  file_lampiran?: File;
  deadline: string;
}

export interface SubmitTugasPayload {
  id_tugas: string;
  file_jawaban?: File;
  catatan_siswa?: string;
}
