import api from './api';
import type {
  Tugas,
  TugasWithDetails,
  CreateTugasPayload,
  PengumpulanTugas,
  PengumpulanWithSiswa,
} from '@/types/tugas';

/**
 * Dapatkan daftar tugas per pengampu/siswa
 */
export async function getTugas(id_pengampu?: string): Promise<TugasWithDetails[]> {
  try {
    const params = id_pengampu ? { id_pengampu } : {};
    const response = await api.get<TugasWithDetails[]>('/tugas', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan detail tugas
 */
export async function getTugasDetail(id_tugas: string): Promise<TugasWithDetails> {
  try {
    const response = await api.get<TugasWithDetails>(`/tugas/${id_tugas}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Buat tugas baru
 */
export async function createTugas(data: CreateTugasPayload): Promise<Tugas> {
  try {
    const formData = new FormData();
    formData.append('id_pengampu', data.id_pengampu);
    formData.append('judul', data.judul);
    formData.append('deskripsi', data.deskripsi);
    formData.append('deadline', data.deadline);
    if (data.file_lampiran) {
      formData.append('file_lampiran', data.file_lampiran);
    }

    const response = await api.post<Tugas>('/tugas', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Update tugas
 */
export async function updateTugas(
  id_tugas: string,
  data: Partial<CreateTugasPayload>
): Promise<Tugas> {
  try {
    const formData = new FormData();
    if (data.judul) formData.append('judul', data.judul);
    if (data.deskripsi) formData.append('deskripsi', data.deskripsi);
    if (data.deadline) formData.append('deadline', data.deadline);
    if (data.file_lampiran) formData.append('file_lampiran', data.file_lampiran);

    const response = await api.put<Tugas>(`/tugas/${id_tugas}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Hapus tugas
 */
export async function deleteTugas(id_tugas: string): Promise<void> {
  try {
    await api.delete(`/tugas/${id_tugas}`);
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan pengumpulan tugas per tugas
 */
export async function getPengumpulanTugas(id_tugas: string): Promise<PengumpulanWithSiswa[]> {
  try {
    const response = await api.get<PengumpulanWithSiswa[]>(`/tugas/${id_tugas}/pengumpulan`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan pengumpulan siswa
 */
export async function getPengumpulanSiswa(): Promise<PengumpulanTugas[]> {
  try {
    const response = await api.get<PengumpulanTugas[]>('/tugas/pengumpulan/siswa');
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Submit pengumpulan tugas
 */
export async function submitTugas(
  id_tugas: string,
  data: { file_jawaban?: File; catatan_siswa?: string }
): Promise<PengumpulanTugas> {
  try {
    const formData = new FormData();
    formData.append('id_tugas', id_tugas);
    if (data.file_jawaban) {
      formData.append('file_jawaban', data.file_jawaban);
    }
    if (data.catatan_siswa) {
      formData.append('catatan_siswa', data.catatan_siswa);
    }

    const response = await api.post<PengumpulanTugas>('/tugas/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Beri nilai & feedback
 */
export async function scoreSubmission(
  id_pengumpulan: string,
  nilai: number,
  feedback_guru: string
): Promise<PengumpulanTugas> {
  try {
    const response = await api.put<PengumpulanTugas>(
      `/tugas/pengumpulan/${id_pengumpulan}/score`,
      { nilai, feedback_guru }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
