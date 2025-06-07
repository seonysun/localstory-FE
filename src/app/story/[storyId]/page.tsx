import React from 'react';
import StoryDetailCommentSection from '@components/story/detail/sections/StoryDetailCommentSection';
import StoryDetailContent from '@components/story/detail/sections/StoryDetailContent';
import StoryDetailMetaSection from '@components/story/detail/sections/StoryDetailMetaSection';

import { mockStoryList } from '@/mocks/mockStoryList';

function Page({ params }: { params: { storyId: string } }) {
  const findData = mockStoryList.find(
    item => item.id === Number(params.storyId),
  );
  return (
    <section>
      <StoryDetailContent findData={findData} />
      <StoryDetailMetaSection />
      <StoryDetailCommentSection />
    </section>
  );
}

export default Page;
