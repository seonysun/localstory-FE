import React from 'react';
import Image from 'next/image';

import { css } from '@root/styled-system/css';

// 추후 날짜 별 여행 코스 들어가야함
function StoryDetailMetaSection() {
  return (
    <article className={css({ mt: 12, mb: 12 })}>
      <div>
        <h1 className={css({ textStyle: 'headline3', mb: 12 })}>
          Day 1 | 2025.05.27
        </h1>
        <Image
          src="/images/mainStory.png"
          alt="story"
          width={1200}
          height={500}
          className={css({ height: '500px', objectFit: 'cover' })}
        />
        <ul
          className={css({
            mt: 12,
            display: 'flex',
            gap: 4,
            flexDir: 'column',
          })}
        >
          <li className={css({ textStyle: 'headline4' })}>
            부산역
            <p className={css({ color: 'gray.100', textStyle: 'body2' })}>
              사이다와 계란을 챙겨서 KTX
            </p>
          </li>
          <li className={css({ textStyle: 'headline4' })}>
            부산역{' '}
            <p className={css({ color: 'gray.100', textStyle: 'body2' })}>
              사이다와 계란을 챙겨서 KTX
            </p>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default StoryDetailMetaSection;
