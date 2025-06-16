'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/useAuthStore';

const PUBLIC_ROUTES = ['/', '/login'];

export default function GlobalAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore(state => state.user);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!user && !isPublicRoute) {
      router.replace('/login');
    }
  }, [user, isPublicRoute, router]);

  return children;
}
