'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  loginBackground,
  loginButton,
  loginButtonText,
  loginButtonWrapper,
  loginContainer,
  loginContentWrapper,
  loginEyelash,
  loginFadeIn,
  loginIcon,
  loginTitle,
} from '@/app/login/Login.recipe';
import { GoogleIcon } from '@/components/icons/shared/GoogleIcon';
import { KakaoIcon } from '@/components/icons/shared/KakaoIcon';
import { Button } from '@/components/ui/common/buttons/Button';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from '@/constants/auth';

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<
    'kakao' | 'google' | null
  >(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (provider: 'kakao' | 'google') => {
    setLoadingProvider(provider);
    if (provider === 'kakao') {
      window.location.href = KAKAO_AUTH_URL;
    } else if (provider === 'google') {
      window.location.href = GOOGLE_AUTH_URL;
    }

    try {
      toast.success('로그인에 성공했습니다!');
    } catch (error) {
      toast.error('로그인에 실패했습니다. 아이디와 비밀번호를 확인해 주세요.');
    }
  };

  const isLoading = (provider: 'kakao' | 'google') =>
    loadingProvider === provider;

  return (
    <div className={loginContainer()}>
      <div className={loginBackground()}>
        <div className={loginContentWrapper()}>
          <p className={`${loginEyelash()} ${visible ? 'visible' : ''}`}>
            어디로든, 일로일로와 함께
          </p>
          <h1 className={`${loginTitle()} ${visible ? 'visible' : ''}`}>
            여행에 필요한
            <br />
            모든 정보를
          </h1>

          <div className={loginFadeIn({ visible })}>
            <div className={loginButtonWrapper()}>
              <Button
                color="custom"
                size="lg"
                radius="sm"
                fullWidth
                disabled={isLoading('kakao')}
                className={loginButton({
                  provider: 'kakao',
                  loading: isLoading('kakao'),
                })}
                onClick={() => handleLogin('kakao')}
                aria-label={
                  isLoading('kakao') ? '카카오 로그인 중' : '카카오 로그인'
                }
                aria-disabled={isLoading('kakao')}
              >
                <KakaoIcon className={loginIcon()} />
                <span className={loginButtonText()}>
                  {isLoading('kakao') ? '로그인 중...' : '카카오 로그인'}
                </span>
              </Button>

              <Button
                color="custom"
                size="lg"
                radius="sm"
                fullWidth
                disabled={isLoading('google')}
                className={loginButton({
                  provider: 'google',
                  loading: isLoading('google'),
                })}
                onClick={() => handleLogin('google')}
                aria-label={
                  isLoading('google') ? '구글 로그인 중' : '구글 로그인'
                }
                aria-disabled={isLoading('google')}
              >
                <GoogleIcon className={loginIcon()} />
                <span className={loginButtonText()}>
                  {isLoading('google') ? '로그인 중...' : '구글 로그인'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
