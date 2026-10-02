import api from './api';
import type { Materi, MateriWithDetails, CreateMateriPayload } from '@/types/materi';

/**
 * Dapatkan daftar materi per pengampu/kelas
 */
export async function getMateri(id_pengampu?: string): Promise<MateriWithDetails[]> {
  try {
    const params = id_pengampu ? { id_pengampu } : {};
    const response = await api.get<MateriWithDetails[]>('/materi', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan detail materi
 */
export async function getMaterialDetail(id_materi: string): Promise<MateriWithDetails> {
  try {
    const response = await api.get<MateriWithDetails>(`/materi/${id_materi}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Buat materi baru
 */
export async function createMateri(data: CreateMateriPayload): Promise<Materi> {
  try {
    const formData = new FormData();
    formData.append('id_pengampu', data.id_pengampu);
    formData.append('judul', data.judul);
    formData.append('deskripsi', data.deskripsi);
    if (data.file_materi) {
      formData.append('file_materi', data.file_materi);
    }
    if (data.link_video) {
      formData.append('link_video', data.link_video);
    }

    const response = await api.post<Materi>('/materi', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Update materi
 */
export async function updateMateri(
  id_materi: string,
  data: Partial<CreateMateriPayload>
): Promise<Materi> {
  try {
    const formData = new FormData();
    if (data.judul) formData.append('judul', data.judul);
    if (data.deskripsi) formData.append('deskripsi', data.deskripsi);
    if (data.file_materi) formData.append('file_materi', data.file_materi);
    if (data.link_video) formData.append('link_video', data.link_video);

    const response = await api.put<Materi>(`/materi/${id_materi}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Hapus materi
 */
export async function deleteMateri(id_materi: string): Promise<void> {
  try {
    await api.delete(`/materi/${id_materi}`);
  } catch (error) {
    throw error;
  }
}

/**
 * Download file materi
 */
export function getDownloadURL(id_materi: string, filename: string): string {
  return `${api.defaults.baseURL}/materi/${id_materi}/download/${filename}`;
}
