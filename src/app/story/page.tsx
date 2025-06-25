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

export const metadata = {
  title: '부산 여행 스토리',
  description:
    '부산 여행의 다양한 스토리를 만나보세요. 일로일로와 함께 부산을 여행하며 추억을 남기세요!',
  openGraph: {
    title: '부산 여행 스토리',
    description:
      '부산 여행의 다양한 스토리를 만나보세요. 일로일로와 함께 부산을 여행하며 추억을 남기세요!',
    url: 'https://www.localstorymap.com/story',
    siteName: '일로일로',
    images: [
      {
        url: '/images/mainStory.png',
        width: 1200,
        height: 630,
        alt: '부산 여행 대표 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '부산 여행 스토리',
    description:
      '부산 여행의 다양한 스토리를 만나보세요. 일로일로와 함께 부산을 여행하며 추억을 남기세요!',
    images: ['/images/mainStory.png'],
  },
  keywords: ['부산', '여행', '스토리', 'OZ', '일로일로', '여행 후기'],
};

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
