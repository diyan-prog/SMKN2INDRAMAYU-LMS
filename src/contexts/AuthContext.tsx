import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import type { UserRole } from '@/types/user';

interface UserProfile {
  id_user: string;
  nama_lengkap: string;
  email: string;
  role: UserRole;
  nip_nis: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus digunakan dalam AuthProvider');
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            setUserProfile(data);
            setUserRole(data.role);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorMessages: Record<string, string> = {
        'auth/invalid-credential': 'Email atau kata sandi salah',
        'auth/user-not-found': 'Akun tidak ditemukan',
        'auth/wrong-password': 'Kata sandi salah',
        'auth/invalid-email': 'Format email tidak valid',
        'auth/user-disabled': 'Akun dinonaktifkan',
        'auth/too-many-requests': 'Terlalu banyak percobaan login. Coba lagi nanti',
      };
      throw new Error(errorMessages[error.code] || 'Gagal login. Silakan coba lagi');
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      const errorMessages: Record<string, string> = {
        'auth/popup-closed-by-user': 'Login dibatalkan',
        'auth/cancelled-popup-request': 'Login dibatalkan',
        'auth/popup-blocked': 'Popup diblokir browser. Izinkan popup dan coba lagi',
        'auth/account-exists-with-different-credential': 'Email sudah terdaftar dengan metode login lain',
      };
      throw new Error(errorMessages[error.code] || 'Gagal login dengan Google');
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'Email tidak terdaftar',
        'auth/invalid-email': 'Format email tidak valid',
      };
      throw new Error(errorMessages[error.code] || 'Gagal mengirim email reset password');
    }
  };

  const value = {
    user,
    userProfile,
    userRole,
    loading,
    loginWithEmail,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
