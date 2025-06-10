import { Suspense } from 'react';

import SearchBar from '@/components/map/SearchBar';
import StoryPlaceList from '@/components/story/StoryPlaceList';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

import { css } from '@root/styled-system/css';

function page() {
  return (
    <>
      <PageHeader>
        <SearchBar basePath="story" />
      </PageHeader>
      <div className={css({ display: { base: 'none', md: 'flex' } })}>
        <SearchBar basePath="story" />
      </div>
      <Suspense fallback={<div>로딩 중</div>}>
        <StoryPlaceList />
      </Suspense>
    </>
  );
}

export default page;
