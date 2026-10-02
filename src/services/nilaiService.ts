import api from './api';

export interface RekapNilai {
  id_siswa: string;
  nama_siswa: string;
  nis: string;
  nilai_tugas: number;
  nilai_kuis: number;
  nilai_akhir: number;
  id_kelas?: string;
  nama_kelas?: string;
}

/**
 * Dapatkan rekap nilai per kelas dan mapel
 */
export async function getRekapNilai(params: {
  id_kelas?: string;
  id_mapel?: string;
}): Promise<RekapNilai[]> {
  try {
    const response = await api.get<RekapNilai[]>('/nilai/rekap', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Dapatkan rekap nilai siswa (untuk siswa sendiri)
 */
export async function getRekapNilaiSiswa(): Promise<RekapNilai> {
  try {
    const response = await api.get<RekapNilai>('/nilai/rekap/siswa');
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Export nilai ke Excel/PDF
 */
export async function exportNilai(params: {
  id_kelas: string;
  id_mapel?: string;
  format: 'excel' | 'pdf';
}): Promise<Blob> {
  try {
    const response = await api.get('/nilai/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
