import api from './api';
import type {
  Presensi,
  PresensiWithDetails,
  RekapPresensi,
  InputPresensiPayload,
} from '@/types/presensi';

/**
 * Dapatkan daftar presensi per pengampu/tanggal
 */
export async function getPresensi(params?: {
  id_pengampu?: string;
  tanggal?: string;
}): Promise<PresensiWithDetails[]> {
  try {
    const response = await api.get<PresensiWithDetails[]>('/presensi', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Input presensi untuk satu pertemuan
 */
export async function inputPresensi(data: InputPresensiPayload): Promise<Presensi[]> {
  try {
    const response = await api.post<Presensi[]>('/presensi', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Update status presensi individual
 */
export async function updatePresensi(
  id_presensi: string,
  status: 'hadir' | 'izin' | 'sakit' | 'alpa'
): Promise<Presensi> {
  try {
    const response = await api.put<Presensi>(`/presensi/${id_presensi}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan rekap presensi per kelas
 */
export async function getRekapPresensi(id_kelas: string): Promise<RekapPresensi[]> {
  try {
    const response = await api.get<RekapPresensi[]>(`/presensi/rekap/${id_kelas}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan rekap presensi siswa (untuk siswa sendiri)
 */
export async function getRekapPresensiSiswa(): Promise<RekapPresensi> {
  try {
    const response = await api.get<RekapPresensi>('/presensi/rekap/siswa');
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Hapus presensi (untuk koreksi)
 */
export async function deletePresensi(id_presensi: string): Promise<void> {
  try {
    await api.delete(`/presensi/${id_presensi}`);
  } catch (error) {
    throw error;
  }
}
