'use client';

import { useRouter } from 'next/navigation';

import { css } from '@root/styled-system/css';

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className={css({
        minH: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bg: 'gray.50',
        color: 'gray.900',
        px: 8,
        py: 16,
        textAlign: 'center',
      })}
    >
      <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: 4 })}>
        페이지를 찾을 수 없습니다!
      </h2>
      <p className={css({ fontSize: 'lg', mb: 8 })}>
        요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
      </p>
      <button
        type="button"
        onClick={() => router.push('/')}
        className={css({
          px: 6,
          py: 2,
          bg: 'gray.900',
          color: 'white',
          borderRadius: 'md',
          fontSize: 'md',
          fontWeight: 'medium',
          cursor: 'pointer',
          _hover: { bg: 'gray.700' },
        })}
      >
        홈으로 가기
      </button>
    </div>
  );
}
