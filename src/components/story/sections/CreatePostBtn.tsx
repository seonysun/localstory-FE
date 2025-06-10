'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CreatePostIcon } from '@components/icons';
import useScrollTop from '@hooks/useScrollTop';

import { css } from '@root/styled-system/css';

function CreatePostBtn() {
  const { showButton } = useScrollTop(500);
  const router = useRouter();
  return (
    showButton && (
      <button
        type="button"
        aria-label="글 쓰기 작성으로 이동"
        className={css({
          position: 'fixed',
          p: 4,
          bg: 'black',
          color: 'white',
          borderRadius: 'full',
          zIndex: 10,
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          bottom: '145px',
          right: '1rem',
          transform: 'translateZ(0)',
          _active: {
            WebkitTapHighlightColor: 'transparent',
          },
        })}
        onClick={() => router.push('/story/post')}
      >
        <CreatePostIcon />
      </button>
    )
  );
}

export default CreatePostBtn;
