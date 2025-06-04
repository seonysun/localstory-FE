'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import StoryHeroSection from '@components/story/sections/StoryHeroSection';
import StoryListSection from '@components/story/sections/StoryListSection';
import StorySearchSection from '@components/story/sections/StorySearchSection';

function StoryListPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') ?? '';
  const region = searchParams.get('region') ?? '';

  return (
    <section>
      <StoryHeroSection />
      <StorySearchSection keyword={keyword} />
      <StoryListSection keyword={keyword} region={region} />
    </section>
  );
}

export default StoryListPage;
