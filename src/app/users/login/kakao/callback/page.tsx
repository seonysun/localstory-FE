'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { postKakaoLoginCode } from '@/app/api/login/loginApi';
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';
import { useAuthStore } from '@/store/useAuthStore';

function KakaoCallbackContent() {
  const params = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    const code = params.get('code');
    if (!code) return;

    postKakaoLoginCode(code)
      .then(({ access, refresh, user }) => {
        setAuth(user, access, refresh);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        router.push('/');
      })
      .catch(err => {
        console.error('카카오 로그인 실패:', err);
      });
  }, [params, router, setAuth]);

  return <SpinnerMessage message="로그인 중입니다..." />;
}

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<SpinnerMessage message="로딩 중..." />}>
      <KakaoCallbackContent />
    </Suspense>
  );
}
