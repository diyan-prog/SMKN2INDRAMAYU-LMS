export interface Materi {
  id_materi: string;
  id_pengampu: string;
  judul: string;
  deskripsi: string;
  file_materi?: string;
  link_video?: string;
  tanggal_upload: string;
}

export interface MateriWithDetails extends Materi {
  nama_mapel: string;
  nama_kelas: string;
  nama_guru: string;
}

export interface CreateMateriPayload {
  id_pengampu: string;
  judul: string;
  deskripsi: string;
  file_materi?: File;
  link_video?: string;
}
