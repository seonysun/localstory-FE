import React from 'react';
import type { Metadata } from 'next';
import { ENDPOINTS } from '@api/endpoints';
import { ssrFetcher } from '@api/fetcher';
import StoryDetailContent from '@components/story/detail/StoryDetailContent';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { css } from '@root/styled-system/css';

export async function generateMetadata({
  params,
}: {
  params: { storyId: string };
}): Promise<Metadata> {
  const { storyId } = params;
  try {
    const story = await ssrFetcher(ENDPOINTS.STORY.DETAIL(storyId));
    return {
      title: story.title || '스토리 상세',
      description: story.content?.slice(0, 80) || '스토리 상세 페이지',
      openGraph: {
        title: story.title || '스토리 상세',
        description: story.content?.slice(0, 80) || '스토리 상세 페이지',
        images: [
          story.storyImages?.[0]?.imageUrl || '/images/default-thumbnail.png',
        ],
      },
    };
  } catch (e) {
    return {
      title: '스토리 상세',
      description: '스토리 상세 페이지',
      openGraph: {
        title: '스토리 상세',
        description: '스토리 상세 페이지',
        images: ['/images/default-thumbnail.png'],
      },
    };
  }
}

async function Page({ params }: { params: { storyId: string } }) {
  const { storyId } = params;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });

  try {
    await queryClient.prefetchQuery({
      queryKey: ['storyDetail', storyId],
      queryFn: () => ssrFetcher(ENDPOINTS.STORY.DETAIL(storyId)),
    });
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('StoryDetail prefetch error:', e);
    }
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={css({ mt: 12 })}>
        <StoryDetailContent storyId={storyId} />
      </section>
    </HydrationBoundary>
  );
}

export default Page;
