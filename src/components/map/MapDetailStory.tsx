'use client';

import { useRouter } from 'next/navigation';

import MapDetailStoryImages from '@/components/map/MapDetailStoryImages';
import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import { modalText } from '@/components/ui/common/modals/modal.recipe';

type MapDetailStoryProps = {
  id: number;
  title: string;
};

function MapDetailStory({ id, title }: MapDetailStoryProps) {
  const router = useRouter();

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
      <MapDetailStoryImages id={id} title={title} />
    </div>
  );
}

export default MapDetailStory;
