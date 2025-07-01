'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { setAuthHeader } from '@/api/instance';
import { postGoogleLoginCode } from '@/api/options/loginApi';
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';
import { useAuthStore } from '@/store/useAuthStore';
import { ApiUser, apiUserToClientUser } from '@/types/user';

function GoogleCallbackContent() {
  const code = useSearchParams().get('code');
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);
  const isRequested = useRef(false);

  useEffect(() => {
    if (!code || isRequested.current) return;

    isRequested.current = true;

    postGoogleLoginCode(code)
      .then(({ access, refresh, user }) => {
        const clientUser = apiUserToClientUser(user as ApiUser);
        setAuth(clientUser, access, refresh);

        setAuthHeader(access);
        router.push('/');
      })
      .catch(err => {
        console.error('구글 로그인 실패:', err);
      });
  }, [code, router, setAuth]);

  return <SpinnerMessage message="로그인 중입니다..." />;
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<SpinnerMessage message="로딩 중..." />}>
      <GoogleCallbackContent />
    </Suspense>
  );
}
