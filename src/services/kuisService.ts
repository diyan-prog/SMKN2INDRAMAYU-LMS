import api from './api';
import type {
  Kuis,
  KuisWithDetails,
  CreateKuisPayload,
  SoalKuis,
  HasilKuis,
  HasilKuisWithSiswa,
  SubmitKuisPayload,
} from '@/types/kuis';

/**
 * Dapatkan daftar kuis per pengampu
 */
export async function getKuis(id_pengampu?: string): Promise<KuisWithDetails[]> {
  try {
    const params = id_pengampu ? { id_pengampu } : {};
    const response = await api.get<KuisWithDetails[]>('/kuis', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan detail kuis
 */
export async function getKuisDetail(id_kuis: string): Promise<KuisWithDetails> {
  try {
    const response = await api.get<KuisWithDetails>(`/kuis/${id_kuis}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Buat kuis baru dengan soal
 */
export async function createKuis(data: CreateKuisPayload): Promise<Kuis> {
  try {
    const response = await api.post<Kuis>('/kuis', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Update kuis
 */
export async function updateKuis(id_kuis: string, data: Partial<Kuis>): Promise<Kuis> {
  try {
    const response = await api.put<Kuis>(`/kuis/${id_kuis}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Hapus kuis
 */
export async function deleteKuis(id_kuis: string): Promise<void> {
  try {
    await api.delete(`/kuis/${id_kuis}`);
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan soal kuis (untuk siswa - tanpa kunci jawaban)
 */
export async function getSoalKuis(id_kuis: string): Promise<Omit<SoalKuis, 'kunci_jawaban'>[]> {
  try {
    const response = await api.get<Omit<SoalKuis, 'kunci_jawaban'>[]>(
      `/kuis/${id_kuis}/soal`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan soal kuis dengan kunci (untuk guru)
 */
export async function getSoalKuisWithKeys(id_kuis: string): Promise<SoalKuis[]> {
  try {
    const response = await api.get<SoalKuis[]>(`/kuis/${id_kuis}/soal/full`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Submit jawaban kuis siswa (auto-scoring)
 */
export async function submitKuis(data: SubmitKuisPayload): Promise<HasilKuis> {
  try {
    const response = await api.post<HasilKuis>('/kuis/submit', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan hasil kuis per kuis (untuk guru)
 */
export async function getHasilKuis(id_kuis: string): Promise<HasilKuisWithSiswa[]> {
  try {
    const response = await api.get<HasilKuisWithSiswa[]>(`/kuis/${id_kuis}/hasil`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan hasil kuis siswa
 */
export async function getHasilKuisSiswa(): Promise<HasilKuis[]> {
  try {
    const response = await api.get<HasilKuis[]>('/kuis/hasil/siswa');
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Cek apakah siswa sudah mengerjakan kuis
 */
export async function checkKuisDone(id_kuis: string): Promise<boolean> {
  try {
    const response = await api.get<{ done: boolean }>(`/kuis/${id_kuis}/check`);
    return response.data.done;
  } catch (error) {
    throw error;
  }
}
