import React, { Suspense } from 'react';
import StoryListPage from '@components/story/StoryListPage';

function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <StoryListPage />
    </Suspense>
  );
}

export default Page;
