/**
 * @file Login.recipe.ts
 * @description 로그인 페이지에서 사용되는 스타일 (layout, 타이틀, 버튼 등)
 * @usage
 * tsx
 * import {
 *   loginContainer,
 *   loginButtonWrapper,
 *   loginTitle,
 *   loginButton
 * } from '@/components/ui/login/Login.recipe';
 */

import { cva } from '@root/styled-system/css';

/**
 * @description 로그인 페이지 전체 뷰포트 컨테이너
 */
export const loginContainer = cva({
  base: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
  },
});

/**
 * @description 로그인 배경 (이미지 + 오버레이 포함)
 */
export const loginBackground = cva({
  base: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/images/login-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.08))',
      zIndex: 1,
      pointerEvents: 'none',
    },
  },
});

/**
 * @description 로그인 내부 컨텐츠 wrapper
 */
export const loginContentWrapper = cva({
  base: {
    maxWidth: { base: '100%', md: '768px' },
    margin: '0 auto',
    paddingX: '24px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '40px',
    position: 'relative',
  },
});

/**
 * @description 타이틀 상단 텍스트 (subtitle)
 */
export const loginEyelash = cva({
  base: {
    color: 'white',
    textStyle: 'body2',
    opacity: 0,
    transform: 'translateY(-20px)',
    transition: 'all 0.6s ease-in-out',
    '&.visible': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

/**
 * @description 타이틀 텍스트
 */
export const loginTitle = cva({
  base: {
    position: 'relative',
    zIndex: 2,
    color: 'white',
    textStyle: 'headline1',
    lineHeight: '1.2',
    transition: 'all 0.8s ease-in-out',
    opacity: 0,
    transform: 'translateY(-20px)',
    '&.visible': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

/**
 * @description 로그인 버튼 감싸는 wrapper
 */
export const loginButtonWrapper = cva({
  base: {
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    marginTop: '40px',
  },
});

/**
 * @description 로그인 버튼 내 아이콘 wrapper
 */
export const loginIcon = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    transition: 'transform 0.3s ease-in-out',
    _hover: {
      transform: 'scale(1.1)',
    },
  },
});

/**
 * @description 로그인 버튼 텍스트
 */
export const loginButtonText = cva({
  base: {
    textStyle: 'label2',
  },
});

/**
 * @description 버튼 페이드인 애니메이션
 */
export const loginFadeIn = cva({
  base: {
    transition: 'all 0.8s ease-in-out',
    opacity: 0,
    transform: 'translateY(30px)',
  },
  variants: {
    visible: {
      true: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },
});

/**
 * @description 로그인 버튼 스타일 (kakao / google)
 */
export const loginButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    transform: 'translateY(0)',
    _hover: {
      transform: 'translateY(-2px)',
    },
    _active: {
      transform: 'translateY(0)',
    },
  },
  variants: {
    provider: {
      kakao: {
        backgroundColor: '#FEE500',
        color: '#000000',
        _hover: {
          backgroundColor: '#e5ce00',
        },
        _active: {
          backgroundColor: '#e5ce00',
        },
      },
      google: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        _hover: {
          backgroundColor: '#f5f5f5',
          border: 'none',
        },
        _active: {
          backgroundColor: '#f5f5f5',
          border: 'none',
        },
      },
    },
    loading: {
      true: {
        opacity: 0.7,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
      false: {
        opacity: 1,
        cursor: 'pointer',
      },
    },
  },
});
