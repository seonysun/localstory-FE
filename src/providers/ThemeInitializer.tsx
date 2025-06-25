'use client';

import { useEffect } from 'react';

import { useThemeStore } from '@/store/useThemeStore';

export default function ThemeInitializer() {
  const { mode } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return null;
}
