'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { gridLayout } from '@/components/map/map.recipe';
import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';
import { modalText } from '@/components/ui/common/modals/modal.recipe';

type MapDetailStoryProps = {
  id: number;
  title: string;
};

function MapDetailStory({ id, title }: MapDetailStoryProps) {
  const router = useRouter();

  const { data, isLoading } = useQuery(markerOption.getMarkerStory(id));
  const storyList = data ?? [];

  if (isLoading)
    return (
      <div>
        <SpinnerMessage />
      </div>
    );
  if (!storyList.length) return <div>작성된 스토리가 없습니다</div>;

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
            router.push(
              `/story/search?query=${encodeURIComponent(title)}&id=${id}`,
            )
          }
        >
          더보기
        </span>
      </p>
      <div className={gridLayout({ columns: 4, gap: 'sm', p: 'xs' })}>
        {storyList.slice(0, 8).map(story => {
          const storyImage = story.storyImages?.[0];
          return (
            <Image
              key={story.storyId}
              src={storyImage?.imageUrl ?? '/images/default-thumbnail.png'}
              alt={story.title}
              width={100}
              height={100}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                cursor: 'pointer',
              }}
              onClick={() => router.push(`/story/${story.storyId}`)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MapDetailStory;
