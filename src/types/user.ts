// Role type
export type UserRole = 'guru' | 'siswa' | 'walikelas' | 'tatausaha' | 'kepsek';

export interface User {
  id_user: string;
  nama_lengkap: string;
  email: string;
  username: string;
  role: UserRole;
  nip_nis: string;
  foto_profil?: string;
  status: 'aktif' | 'nonaktif';
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
  email_or_username: string;
  password: string;
  role: UserRole;
}
