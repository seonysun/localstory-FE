'use client';

import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@store/useAuthStore';

import { css } from '@root/styled-system/css';

function StoryHeroSection() {
  const { user } = useAuthStore();

  return (
    <article>
      <div className={css({ position: 'relative' })}>
        <Image
          src="/images/mainStory.png"
          alt="Story"
          width={1080}
          height={600}
          className={css({
            objectFit: 'cover',
            width: '100%',
            height: '800px',
          })}
        />
        <div
          className={css({
            position: 'absolute',
            top: '20%',
            left: '5%',
            color: 'white',
          })}
        >
          <p className={css({ textStyle: 'headline3', lineHeight: 2 })}>
            {user ? `안녕하세요 ${user.nickname} 님` : '안녕하세요'}
          </p>
          <p className={css({ textStyle: 'body2' })}>일로일로와 떠나요</p>
        </div>
      </div>
    </article>
  );
}

export default StoryHeroSection;
