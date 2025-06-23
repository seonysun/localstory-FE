'use client';

import React from 'react';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import StoryCard from '@components/ui/common/cards/StoryCard';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';

import { css } from '@root/styled-system/css';

function StoryCardListSection() {
  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['story'],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`${ENDPOINTS.STORY.LIST}?page=${pageParam}`)
        .then(res => res.data),
    getNextPageParam: lastPage => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page')) ?? 1;
    },
    initialPageParam: 1,
  });
  const ref = useIntersectionObserver(
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  );
  const storyList = data?.pages.flatMap(p => p.results ?? []);

  if (isError) return <p>...Error</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        mt: 12,
        width: '100%',
        margin: '0 auto',
      })}
    >
      {storyList && storyList?.length > 0 ? (
        storyList?.map(story => (
          <StoryCard key={story?.storyId} story={story} />
        ))
      ) : (
        <p>스토리가 없습니다.</p>
      )}
      <div
        ref={ref}
        style={{
          height: '50px',
          width: '100%',
        }}
      />
    </article>
  );
}

export default StoryCardListSection;
