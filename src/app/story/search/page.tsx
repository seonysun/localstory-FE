import { Suspense } from 'react';

import StoryPlaceList from '@/components/story/StoryPlaceList';

function page() {
  return (
    <Suspense fallback={<div>로딩 중</div>}>
      <StoryPlaceList />
    </Suspense>
  );
}

export default page;
