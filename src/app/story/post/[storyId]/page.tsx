'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { ENDPOINTS } from '@/api/endpoints';
import { ssrFetcher } from '@/api/fetcher';
import StoryPostForm from '@/components/story/StoryPostForm';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';
import { StoryImage } from '@/types/story';

function EditStoryPage() {
  const params = useParams();
  const storyId = params?.storyId as string | undefined;
  const [initialData, setInitialData] = useState<{
    marker: number | null;
    title: string;
    content: string;
    emoji: string;
    storyImages?: StoryImage[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storyId) return;
    async function fetchStory() {
      setLoading(true);
      try {
        const data = await ssrFetcher(ENDPOINTS.STORY.DETAIL(String(storyId)));
        setInitialData({
          marker: data.marker,
          title: data.title,
          content: data.content,
          emoji: data.emoji,
          storyImages: data.storyImages,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [storyId]);

  if (loading) return <div>로딩 중...</div>;
  if (!initialData) return null;

  return (
    <>
      <PageHeader title="스토리" />
      <StoryPostForm initialData={initialData} storyId={Number(storyId)} />
    </>
  );
}

export default EditStoryPage;
