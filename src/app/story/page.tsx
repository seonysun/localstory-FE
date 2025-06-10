import React, { Suspense } from 'react';
import CreatePostBtn from '@components/story/sections/CreatePostBtn';
import StoryListPage from '@components/story/StoryListPage';

function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <StoryListPage />
      <CreatePostBtn />
    </Suspense>
  );
}

export default Page;
