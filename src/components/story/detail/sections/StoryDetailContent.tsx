'use client';

import React from 'react';
import Image from 'next/image';
import { TravelIcon, UserIcon } from '@components/icons';
import { Button } from '@components/ui/common/buttons/Button';
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
      <p className={css({ textStyle: 'headline3', mt: 12 })}>
        {findData?.title}
      </p>
      <div
        className={css({
          display: 'flex',
          mt: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
      >
        <Button color="outline" onClick={() => alert('프로필 보기로 이동 ')}>
          <UserIcon />
          프로필 보기
        </Button>
        <Button
          color="outline"
          onClick={() => alert('사용자 여행 코스로 보기 이동 ')}
        >
          <TravelIcon />
          여행 코스 보기
        </Button>
      </div>
    </article>
  );
}

export default StoryDetailContent;
