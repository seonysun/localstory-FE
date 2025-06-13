'use client';

import React from 'react';
import Image from 'next/image';
import PageHeader from '@components/ui/common/pageHeader/PageHeader';

import { css } from '@root/styled-system/css';

type Props = {
  id: number;
  img: string;
  title: string;
  content: string;
};

// 추후 사진이 여러 장 일시 스와이프 적용 고려
function StoryDetailContent({ findData }: { findData?: Props }) {
  return (
    <article>
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
        2025.05.27
      </h1>
      <p className={css({ textStyle: 'headline3', mb: '12' })}>
        여기는 본문 타이틀 {findData?.title}
      </p>
      <p className={css({ textStyle: 'subtitle4', mb: '36' })}>
        여기는 본문 내용 {findData?.content}
      </p>
    </article>
  );
}

export default StoryDetailContent;
