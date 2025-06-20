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
  // 카카오, 구글 로그인이 붙었을 떄 쿠키로 가져오기
  // const cookie = cookies();
  // const token = cookie.get('access')?.value;
  // const user = await instance.get(ENDPOINTS.USERS.ME, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['story'],
    queryFn: ({ pageParam = 1 }) =>
      ssrFetcher(`${ENDPOINTS.STORY.LIST}?page=${pageParam}`),
    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={css({ mt: 12 })}>
        <StoryHeroSection />
        <StorySearchSection />
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
