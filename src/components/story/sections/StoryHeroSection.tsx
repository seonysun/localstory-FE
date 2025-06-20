import React from 'react';
import Image from 'next/image';

import { css } from '@root/styled-system/css';

function StoryHeroSection() {
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
            안녕하세요 님
          </p>
          <p className={css({ textStyle: 'body2' })}>일로일로와 떠나요</p>
        </div>
      </div>
    </article>
  );
}

export default StoryHeroSection;
