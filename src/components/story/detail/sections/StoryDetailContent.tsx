import React from 'react';
import Image from 'next/image';
import PageHeader from '@components/ui/common/pageHeader/PageHeader';

import { css } from '@root/styled-system/css';

type Props = {
  story: {
    title: string;
    content: string;
    createdAt: string;
  };
};

// 추후 사진이 여러 장 일시 스와이프 적용 고려
function StoryDetailContent({ story }: Props) {
  return (
    <article className={css({ mt: 8 })}>
      <PageHeader title="상세글" />
      <Image
        src="/images/section.png"
        alt="section"
        width={1200}
        height={500}
        className={css({ width: '100%', height: '500px', objectFit: 'cover' })}
      />
      <h1
        className={css({ textStyle: 'headline4', color: 'gray.300', mt: 12 })}
      >
        {story
          ? new Date(story?.createdAt).toLocaleDateString()
          : '날짜 정보 없음'}
      </h1>
      <p className={css({ textStyle: 'headline3', mb: '12' })}>
        {story?.title}
      </p>
      <p className={css({ textStyle: 'subtitle4', mb: '36' })}>
        {story?.content}
      </p>
    </article>
  );
}

export default StoryDetailContent;
