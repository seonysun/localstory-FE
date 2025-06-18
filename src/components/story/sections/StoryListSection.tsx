import React from 'react';
import Link from 'next/link';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import StoryCard from '@components/ui/common/cards/StoryCard';
import { useQuery } from '@tanstack/react-query';

import { css } from '@root/styled-system/css';

type StoryCardProps = {
  storyId: number;
  createdAt: string;
  title: string;
  content: string;
  userNickname: string;
  userProfileImage: string;
  viewCount: number;
  likeCount: number;
};

type StoryResponse = {
  data: StoryCardProps[];
};

function StoryListSection({
  keyword,
  region,
}: {
  keyword: string;
  region: string;
}) {
  const { data } = useQuery<StoryResponse>({
    queryKey: ['story'],
    queryFn: () => instance.get(ENDPOINTS.STORY.LIST),
  });

  return (
    <article className={css({ mb: 12 })}>
      <div className={css({ mb: 12 })}>
        <h1 className={css({ textStyle: 'headline3' })}>서울 여행</h1>
        <p className={css({ textStyle: 'body2', mt: 2 })}>
          직접 다녀온 생생한 후기를 확인해보세요
        </p>
      </div>
      {data && data?.data.length > 0 ? (
        data?.data.map(item => (
          <div
            key={item.storyId}
            className={css({
              display: 'flex',
              flexDirection: 'column',
              mb: 8,
            })}
          >
            <Link href={`/story/${item.storyId}`}>
              <StoryCard
                images={[item.userProfileImage]}
                storyId={item.storyId ? String(item.storyId) : 'mock-id'}
                title={item.title}
                content={item.content}
                userProfile={item.userProfileImage}
                viewCount={item.viewCount}
                likeCount={item.likeCount}
                userNickname={item.userNickname}
                createdAt={item.createdAt}
              />
            </Link>
          </div>
        ))
      ) : (
        <p>스토리가 없습니다.</p>
      )}
    </article>
  );
}

export default StoryListSection;
