'use client';

import { useEffect, useState } from 'react';

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

/**
 * @component LoginPage
 * @description 소셜 로그인 페이지 컴포넌트
 */
export default function LoginPage() {
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleKakaoLogin = async () => {
    setIsKakaoLoading(true);
    try {
      console.log('카카오 로그인');
    } finally {
      setIsKakaoLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      console.log('구글 로그인');
    } finally {
      setIsGoogleLoading(false);
    }
  };

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
                disabled={isKakaoLoading}
                className={loginButton({
                  provider: 'kakao',
                  loading: isKakaoLoading,
                })}
                onClick={handleKakaoLogin}
                aria-label={
                  isKakaoLoading ? '카카오 로그인 중' : '카카오 로그인'
                }
                aria-disabled={isKakaoLoading}
              >
                <KakaoIcon className={loginIcon()} />
                <span className={loginButtonText()}>
                  {isKakaoLoading ? '로그인 중...' : '카카오 로그인'}
                </span>
              </Button>

              <Button
                color="custom"
                size="lg"
                radius="sm"
                fullWidth
                disabled={isGoogleLoading}
                className={loginButton({
                  provider: 'google',
                  loading: isGoogleLoading,
                })}
                onClick={handleGoogleLogin}
                aria-label={isGoogleLoading ? '구글 로그인 중' : '구글 로그인'}
                aria-disabled={isGoogleLoading}
              >
                <GoogleIcon className={loginIcon()} />
                <span className={loginButtonText()}>
                  {isGoogleLoading ? '로그인 중...' : '구글 로그인'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
