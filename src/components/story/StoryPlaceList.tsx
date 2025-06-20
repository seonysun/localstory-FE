'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useQueries, useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { storyOption } from '@/api/options/storyOption';
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
import { Story, StoryImage } from '@/types/story';
import { formatDate } from '@/util/date';

import { css, cx } from '@root/styled-system/css';

function StoryPlaceList() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const id = searchParams.get('id') || 0;

  const { data } = useQuery(markerOption.getMarkerStory(Number(id)));
  const storyList = data?.data ?? [];
  const storyIds = storyList.map((story: Story) => story.storyId) ?? [];
  const storyImageQueries = useQueries({
    queries: storyIds.map(storyId => storyOption.getStoryImage(storyId)),
  });
  const storyImages: StoryImage[] = storyImageQueries
    .map(q => {
      const images = q.data?.data ?? [];
      return images[0];
    })
    .filter(Boolean);

  const place = storyList[0] ?? 0;
  const { data: marker } = useQuery(markerOption.getMarkerDetail(place.marker));

  return (
    <div className={flex({ p: 'sm', marginT: 'sm', marginB: 'sm' })}>
      {query.trim() === '' || storyList.length < 1 ? (
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
                <span className={modalText({ clamp: 1, align: 'left' })}>
                  {marker?.adress}
                </span>
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
            {storyList.map((story, i) => {
              const image =
                storyImages[i]?.imageUrl ?? '/images/default-thumbnail.png';
              return (
                <SquareCard
                  key={story.storyId}
                  image={image}
                  liked={story.isLiked}
                  custom
                  onClick={() => router.push(`/story/${story.storyId}`)}
                >
                  <div
                    className={flex({
                      position: 'relative',
                      gap: 'xs',
                      p: 'xs',
                    })}
                  >
                    <p className={titleText()}>{story.userNickname}</p>
                    <p
                      className={flex({
                        direction: 'row',
                        align: 'center',
                        gap: 'xs',
                      })}
                    >
                      <CalendarIcon />
                      <span className={subText({ color: 'muted', clamp: 1 })}>
                        {formatDate(story.createdAt)}
                      </span>
                    </p>
                    <span className={topRightAbsolute({ top: 1, right: 3 })}>
                      <FeelingIcon size={24} value={story.emoji} />
                    </span>
                  </div>
                </SquareCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryPlaceList;
