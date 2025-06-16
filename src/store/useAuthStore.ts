import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  nickname: string;
  provider: string;
  profile_image?: string;
  is_paid_user?: boolean;
}

interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  setAuth: (user: User, access: string, refresh: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  access: null,
  refresh: null,
  setAuth: (user, access, refresh) => set({ user, access, refresh }),
  clearAuth: () => set({ user: null, access: null, refresh: null }),
}));
