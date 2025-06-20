'use client';

import Image from 'next/image';
import { useQueries, useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { storyOption } from '@/api/options/storyOption';
import { gridLayout } from '@/components/map/map.recipe';
import { Story, StoryImage } from '@/types/story';

function MapDetailStoryImages({ id, title }: { id: number; title: string }) {
  const { data: storyList } = useQuery(markerOption.getMarkerStory(id));
  const storyIds = storyList?.data?.map((story: Story) => story.storyId) ?? [];
  const storyImageQueries = useQueries({
    queries: storyIds.map(storyId => storyOption.getStoryImage(storyId)),
  });
  const storyImages: StoryImage[] = storyImageQueries
    .map(q => {
      const images = q.data?.data ?? [];
      return images[0];
    })
    .filter(Boolean);

  if (!storyIds.length) return <div>작성된 스토리가 없습니다</div>;
  if (!storyImages.length)
    return <div>스토리는 있지만 등록된 이미지가 없습니다</div>;

  return (
    <div className={gridLayout({ columns: 4, gap: 'sm', p: 'xs' })}>
      {storyImages.map((img, i) => (
        <Image
          key={i}
          src={img.imageUrl}
          alt={title}
          width={100}
          height={100}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 8,
          }}
        />
      ))}
    </div>
  );
}

export default MapDetailStoryImages;
