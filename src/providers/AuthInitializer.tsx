'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

export default function AuthInitializer() {
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    if (user && access && refresh) {
      setAuth(JSON.parse(user), access, refresh);
    }
  }, [setAuth]);

  return null;
}
