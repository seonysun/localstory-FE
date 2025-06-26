'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
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
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import FeelingIcon from '@/components/ui/feelings/FeelingIcon';
import { formatDate } from '@/util/date';

import { css, cx } from '@root/styled-system/css';

function StoryPlaceList() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.trim() ?? '';
  const id = searchParams.get('id') ?? 0;

  const { data, isLoading } = useQuery(markerOption.getMarkerStory(Number(id)));
  const storyList = data ?? [];

  const place = storyList[0] ?? {};
  const { data: marker } = useQuery(markerOption.getMarkerDetail(place.marker));

  if (isLoading)
    return (
      <div>
        <SpinnerMessage />
      </div>
    );

  return (
    <div className={flex({ p: 'sm', marginT: 'sm', marginB: 'sm' })}>
      {!query || storyList.length < 1 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className={flex({ gap: 'lg' })}>
          <div className={flexBetween()}>
            <div
              className={flex({ gap: 'xs' })}
              onClick={() => router.push(`/map/search?id=${id}`)}
              style={{ cursor: 'pointer' }}
            >
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
                  {marker?.adress || '장소 정보 없음'}
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
            {storyList.map(story => {
              const storyImage = story.storyImages?.[0];
              return (
                <SquareCard
                  key={story.storyId}
                  image={storyImage?.imageUrl}
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
