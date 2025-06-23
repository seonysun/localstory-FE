import { Suspense } from 'react';
import { ENDPOINTS } from '@api/endpoints';
import { ssrFetcher } from '@api/fetcher';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import {
  CreatePostBtn,
  StoryCardListSection,
  StoryHeroSection,
  StorySearchSection,
} from '@/components/story/sections';

import { css } from '@root/styled-system/css';

async function Page() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });

  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['story'],
      queryFn: ({ pageParam = 1 }) =>
        ssrFetcher(`${ENDPOINTS.STORY.LIST}?page=${pageParam}`),
      initialPageParam: 1,
    });
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Story prefetch error:', e);
    }
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={css({ mt: 12 })}>
        <StoryHeroSection />
        <Suspense fallback={<div>로딩중...</div>}>
          <StorySearchSection />
        </Suspense>
        <article className={css({ mt: 24 })}>
          <h1 className={css({ textStyle: 'headline2', lineHeight: 2 })}>
            부산 여행
          </h1>
          <p className={css({ textStyle: 'body2' })}>일로일로와 떠나요</p>
        </article>
        <StoryCardListSection />
        <CreatePostBtn />
      </section>
    </HydrationBoundary>
  );
}

export default Page;
