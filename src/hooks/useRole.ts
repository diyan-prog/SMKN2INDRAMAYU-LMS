import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/user';
import { getDashboardRoute, hasAccessToRoute, isAllowedRole } from '@/utils/roleHelper';

export function useRole() {
  const { userRole, userProfile } = useAuth();

  const getCurrentRole = () => {
    return userRole ?? null;
  };

  const getDashboardRouteForUser = () => {
    const role = getCurrentRole();
    return role ? getDashboardRoute(role) : '/login';
  };

  const hasAccess = (path: string) => {
    const role = getCurrentRole();
    if (!role) return false;
    return hasAccessToRoute(role, path);
  };

  const isAllowed = (allowedRoles: string[]) => {
    const role = getCurrentRole();
    if (!role) return false;
    return isAllowedRole(role, allowedRoles as UserRole[]);
  };

  const getUserInitials = () => {
    if (!userProfile?.nama_lengkap) return 'U';
    return userProfile.nama_lengkap
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserDisplayName = () => {
    if (!userProfile?.nama_lengkap) return '';
    const nameParts = userProfile.nama_lengkap.split(' ');
    return nameParts[0] + (nameParts.length > 1 ? ' ' + nameParts[1] : '');
  };

  return {
    role: getCurrentRole(),
    getDashboardRoute: getDashboardRouteForUser,
    hasAccess,
    isAllowed,
    getUserInitials,
    getUserDisplayName,
  };
}
