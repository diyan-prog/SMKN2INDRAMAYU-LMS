import api from './api';
import type { AuthResponse, LoginPayload } from '@/types/user';

/**
 * Login dengan email/username dan password
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('/auth/login', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Register user baru (optional - untuk dev/admin)
 */
export async function register(data: {
  nama_lengkap: string;
  email: string;
  username: string;
  password: string;
  role: string;
  nip_nis: string;
}): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Logout (clear token di backend)
 */
export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
}

/**
 * Verify token validity
 */
export async function verifyToken(): Promise<boolean> {
  try {
    await api.get('/auth/verify');
    return true;
  } catch {
    return false;
  }
}
