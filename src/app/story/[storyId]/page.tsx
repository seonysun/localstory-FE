import React from 'react';
import { ENDPOINTS } from '@api/endpoints';
import { ssrFetcher } from '@api/fetcher';
import StoryDetailContent from '@components/story/detail/StoryDetailContent';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { css } from '@root/styled-system/css';

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
