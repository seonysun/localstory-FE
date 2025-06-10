'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { CalendarIcon, EllipsisIcon, LocationIcon } from '@/components/icons';
import { gridLayout } from '@/components/map/map.recipe';
import {
  flex,
  flexBetween,
  subText,
  titleText,
  topRightAbsolute,
} from '@/components/ui/common/cards/card.recipe';
import SquareCard from '@/components/ui/common/cards/SquareCard';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import FeelingIcon from '@/components/ui/feelings/FeelingIcon';
import { placeStoryList } from '@/mocks/placeStoryList';

import { css, cx } from '@root/styled-system/css';

function StoryPlaceList() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const data = placeStoryList;

  return (
    <div className={flex({ p: 'sm', marginT: 'sm', marginB: 'sm' })}>
      {query.trim() === '' || data.length < 1 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className={flex({ gap: 'lg' })}>
          <div className={flexBetween()}>
            <div className={flex({ gap: 'xs' })}>
              <span className={modalText({ text: 'search', align: 'left' })}>
                {query}
              </span>
              <p
                className={cx(
                  flex({ direction: 'row', align: 'center', gap: 'xs' }),
                  modalText({ text: 'body2', color: 'gray400' }),
                )}
              >
                <LocationIcon width={20} height={20} />
                {data[0].location}
              </p>
            </div>
            <EllipsisIcon width={28} height={28} />
          </div>
          <div
            className={cx(
              gridLayout(),
              css({
                gridTemplateColumns: {
                  base: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
              }),
            )}
          >
            {data.map(story => (
              <SquareCard
                key={story.id}
                image={story.image}
                liked={story.liked}
                custom
                onClick={() => router.push(`/story/${story.id}`)}
              >
                <div
                  className={flex({
                    position: 'relative',
                    gap: 'xs',
                    p: 'xs',
                  })}
                >
                  <p className={titleText()}>{story.author}</p>
                  <p
                    className={flex({
                      direction: 'row',
                      align: 'center',
                      gap: 'xs',
                    })}
                  >
                    <CalendarIcon />
                    <span className={subText({ color: 'muted', clamp: 1 })}>
                      {story.date}
                    </span>
                  </p>
                  <span className={topRightAbsolute({ top: 1, right: 3 })}>
                    <FeelingIcon size={24} value={story.feeling} />
                  </span>
                </div>
              </SquareCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryPlaceList;
