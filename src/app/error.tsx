'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { css } from '@root/styled-system/css';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

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
        문제가 발생했습니다.
      </h2>
      <p className={css({ fontSize: 'lg', mb: 8 })}>
        예기치 못한 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <div className={css({ display: 'flex', gap: 4 })}>
        <button
          type="button"
          onClick={() => reset()}
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
          다시 시도
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className={css({
            px: 6,
            py: 2,
            bg: 'gray.200',
            color: 'gray.900',
            borderRadius: 'md',
            fontSize: 'md',
            fontWeight: 'medium',
            cursor: 'pointer',
            _hover: { bg: 'gray.300' },
          })}
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
