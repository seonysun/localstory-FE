'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { bookmarkOption } from '@api/options/bookmarkOption';
import { useQuery } from '@tanstack/react-query';

import {
  flex,
  subText,
  titleText,
} from '@/components/ui/common/cards/card.recipe';
import SquareCard from '@/components/ui/common/cards/SquareCard';
import BookmarkToggle from '@/components/ui/common/toggles/Bookmark';

import { css, cx } from '@root/styled-system/css';

export default function BookmarksPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(bookmarkOption.getBookmarks());

  if (isLoading) {
    return (
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          textStyle: 'body2',
          color: 'gray.400',
        })}
      >
        로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          textStyle: 'body2',
          color: 'error',
        })}
      >
        오류가 발생했습니다.
      </div>
    );
  }

  const bookmarks = data?.results || [];

  if (bookmarks.length === 0) {
    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          gap: 4,
        })}
      >
        <p
          className={css({
            textStyle: 'body1',
            color: 'gray.400',
          })}
        >
          아직 북마크한 스토리가 없습니다.
        </p>
        <p
          className={css({
            textStyle: 'body3',
            color: 'gray.300',
          })}
        >
          마음에 드는 스토리를 북마크해보세요!
        </p>
        <button
          type="button"
          onClick={() => router.push('/story')}
          className={css({
            padding: '12px 24px',
            backgroundColor: 'primary',
            color: 'onPrimary',
            borderRadius: 'md',
            cursor: 'pointer',
            textStyle: 'label2',
            transition: 'all 0.2s',
            _hover: {
              opacity: 0.9,
              transform: 'translateY(-1px)',
            },
          })}
        >
          스토리 둘러보기
        </button>
      </div>
    );
  }

  return (
    <div
      className={cx(
        css({
          display: 'grid',
          gap: 4,
          width: '100%',
          pb: 8,
          gridTemplateColumns: {
            base: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }),
      )}
    >
      {bookmarks.map(bookmark => {
        const story = bookmark.storyDetail;
        const firstImage = story.storyImages?.[0]?.imageUrl;
        const storyId = story.storyId || String(bookmark.story);

        return (
          <div key={bookmark.id} className={css({ position: 'relative' })}>
            <SquareCard
              id={bookmark.id}
              image={firstImage}
              custom
              onClick={() => router.push(`/story/${storyId}`)}
            >
              <div className={flex({ gap: 'sm', px: 'xs' })}>
                <p className={titleText()}>{story.title}</p>
                <p
                  className={subText({
                    textStyle: 'body4',
                    color: 'black',
                    clamp: 1,
                  })}
                >
                  {story.content}
                </p>
                <div
                  className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                  })}
                >
                  <span
                    className={subText({ color: 'muted', textStyle: 'body4' })}
                  >
                    {story.userNickname}
                  </span>
                  <span
                    className={subText({ color: 'muted', textStyle: 'body4' })}
                  >
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </SquareCard>
            <div
              className={css({
                position: 'absolute',
                top: '8px',
                right: '8px',
              })}
            >
              <BookmarkToggle
                storyId={storyId}
                isBookmarked
                bookmarkId={bookmark.id}
                showBackground
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
