'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { setAuthHeader } from '@/api/instance';
import { postKakaoLoginCode } from '@/app/api/login/loginApi';
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';
import { useAuthStore } from '@/store/useAuthStore';
import { ApiUser, apiUserToClientUser } from '@/types/user';

function KakaoCallbackContent() {
  const code = useSearchParams().get('code');
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);
  const isRequested = useRef(false);

  useEffect(() => {
    if (!code || isRequested.current) return;
    isRequested.current = true;

    postKakaoLoginCode(code)
      .then(({ access, refresh, user }) => {
        const clientUser = apiUserToClientUser(user as ApiUser);
        setAuth(clientUser, access, refresh);
        localStorage.setItem('user', JSON.stringify(clientUser));
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        setAuthHeader(access);
        toast.success('로그인에 성공했습니다!');
        router.push('/');
      })
      .catch(err => {
        toast.error('카카오 로그인에 실패했습니다. 다시 시도해 주세요.');
      });
  }, [code, router, setAuth]);

  return <SpinnerMessage message="로그인 중입니다..." />;
}

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<SpinnerMessage message="로딩 중..." />}>
      <KakaoCallbackContent />
    </Suspense>
  );
}
