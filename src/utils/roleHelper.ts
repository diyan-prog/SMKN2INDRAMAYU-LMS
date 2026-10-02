import type { UserRole } from '@/types/user';
import { ROLE_ROUTES } from './constants';

/**
 * Dapatkan route dashboard sesuai role
 */
export function getDashboardRoute(role: UserRole): string {
  return ROLE_ROUTES[role] || '/login';
}

/**
 * Cek apakah role user memiliki akses ke path tertentu
 */
export function hasAccessToRoute(userRole: UserRole, path: string): boolean {
  const allowedRoutes: Record<UserRole, string[]> = {
    guru: ['/guru'],
    siswa: ['/siswa'],
    walikelas: ['/walikelas'],
    tatausaha: ['/tatausaha'],
    kepsek: ['/kepsek'],
  };

  return allowedRoutes[userRole]?.some(route => path.startsWith(route)) ?? false;
}

/**
 * Cek apakah user memiliki salah satu dari role yang diperbolehkan
 */
export function isAllowedRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Dapatkan label role yang human-readable
 */
export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    guru: 'Guru',
    siswa: 'Siswa',
    walikelas: 'Wali Kelas',
    tatausaha: 'Tata Usaha',
    kepsek: 'Kepala Sekolah',
  };
  return labels[role] || role;
}

/**
 * Dapatkan inisial nama (untuk avatar fallback)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
