import { create } from 'zustand';

import { ClientUser } from '@/types/user';

interface AuthState {
  user: ClientUser | null;
  access: string | null;
  refresh: string | null;
  setAuth: (user: ClientUser, access: string, refresh: string) => void;
  updateUser: (user: ClientUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  access: null,
  refresh: null,

  setAuth: (user, access, refresh) => {
    set({ user, access, refresh });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  },

  updateUser: user => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearAuth: () => {
    set({ user: null, access: null, refresh: null });
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  },
}));
