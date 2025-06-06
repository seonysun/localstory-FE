'use client';

import Image from 'next/image';

import { gridLayout } from '@/components/map/map.recipe';
import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import { modalText } from '@/components/ui/common/modals/modal.recipe';

type MapDetailStoryProps = {
  title: string;
  images: string[];
};

function MapDetailStory({ title, images }: MapDetailStoryProps) {
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
          })}
        >
          더보기
        </span>
      </p>
      <div className={gridLayout({ columns: 4, gap: 'sm', p: 'xs' })}>
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={title}
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          />
        ))}
      </div>
    </div>
  );
}

export default MapDetailStory;
