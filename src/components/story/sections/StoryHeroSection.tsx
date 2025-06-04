import React from 'react';
import Image from 'next/image';
import {
  StoryImage,
  StoryOverlay,
  StorySection,
} from '@components/story/sections/story.recipe';
import PageHeader from '@components/ui/common/pageHeader/PageHeader';

import { css } from '@root/styled-system/css';

function StoryHeroSection() {
  return (
    <article className={StorySection()}>
      <PageHeader title="스토리" />
      <Image
        src="/images/mainStory.png"
        alt="story"
        width={1200}
        height={500}
        className={StoryImage()}
      />
      <div className={StoryOverlay()}>
        <p className={css({ textStyle: 'body2', mb: '4' })}>
          안녕하세요, 홍선성현형님
        </p>
        <h1 className={css({ textStyle: 'headline2' })}>
          서울 여행 <br />
          일로일로와 떠나요
        </h1>
      </div>
    </article>
  );
}

export default StoryHeroSection;
