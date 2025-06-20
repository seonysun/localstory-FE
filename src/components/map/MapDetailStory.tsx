'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueries, useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { storyOption } from '@/api/options/storyOption';
import { gridLayout } from '@/components/map/map.recipe';
import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import { Story, StoryImage } from '@/types/story';

type MapDetailStoryProps = {
  id: number;
  title: string;
};

function MapDetailStory({ id, title }: MapDetailStoryProps) {
  const router = useRouter();

  const { data: storyList } = useQuery(markerOption.getMarkerStory(id));
  const storyIds = storyList?.data?.map((story: Story) => story.storyId) ?? [];
  const storyImageQueries = useQueries({
    queries: storyIds.map(storyId => storyOption.getStoryImage(storyId)),
  });

  return (
    <div className={flex({ gap: 'md' })}>
      <p className={flexBetween()}>
        <span
          className={modalText({
            text: 'label1',
            color: 'blue500',
          })}
        >
          이 장소의 스토리
        </span>
        <span
          className={modalText({
            text: 'label2',
            color: 'blue500',
            cursor: 'pointer',
            hover: 'on',
          })}
          onClick={() =>
            router.push(`/story/search?query=${encodeURIComponent(title)}`)
          }
        >
          더보기
        </span>
      </p>
      <div className={gridLayout({ columns: 4, gap: 'sm', p: 'xs' })}>
        {storyImageQueries.map((query, i) => {
          const images = query.data?.data ?? [];
          return images.map((img: StoryImage, j) => (
            <Image
              key={`${i}-${j}`}
              src={img.imageUrl}
              alt={title}
              width={0}
              height={0}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
              }}
            />
          ));
        })}
      </div>
    </div>
  );
}

export default MapDetailStory;
