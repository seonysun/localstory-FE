'use client';

import React, { useEffect, useState } from 'react';
import { bookmarkOption } from '@api/options/bookmarkOption';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import BookmarkIcon from '@/components/icons/ui/BookmarkIcon';
import type { StoryQueryData, StoryType } from '@/types/story.types';

import { css } from '@root/styled-system/css';

interface BookmarkToggleProps {
  storyId: string;
  isBookmarked: boolean;
  bookmarkId?: number;
  onToggle?: (newBookmarked: boolean) => void;
  showBackground?: boolean;
}

export default function BookmarkToggle({
  storyId,
  isBookmarked,
  bookmarkId: propBookmarkId,
  onToggle,
  showBackground = false,
}: BookmarkToggleProps) {
  const queryClient = useQueryClient();
  const [currentBookmarkId, setCurrentBookmarkId] = useState<
    number | undefined
  >(propBookmarkId);

  const mutation = useMutation({
    ...bookmarkOption.toggleBookmark(storyId, currentBookmarkId),
    onMutate: async (currentBookmarked: boolean) => {
      // 이전 데이터 저장
      const previousDetail = queryClient.getQueryData<StoryType>([
        'storyDetail',
        storyId,
      ]);

      const previousList = queryClient.getQueryData<StoryQueryData>(['story']);

      // 스토리 상세 낙관적 업데이트
      queryClient.setQueryData<StoryType>(
        ['storyDetail', storyId, { increaseView: true }],
        old => {
          if (!old) return old;
          return {
            ...old,
            isBookmarked: !currentBookmarked,
          };
        },
      );

      // 스토리 목록 낙관적 업데이트
      queryClient.setQueryData<StoryQueryData>(['story'], old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            results: page.results.map(item =>
              item.storyId === storyId
                ? { ...item, isBookmarked: !currentBookmarked }
                : item,
            ),
          })),
        };
      });

      return { previousDetail, previousList };
    },
    onError: (err, variables, context) => {
      // 에러 시 롤백
      if (context?.previousDetail) {
        queryClient.setQueryData(
          ['storyDetail', storyId, { increaseView: true }],
          context.previousDetail,
        );
      }
      if (context?.previousList) {
        queryClient.setQueryData(['story'], context.previousList);
      }
    },
    onSuccess: data => {
      // 북마크 추가 성공 시 ID 저장
      if (data?.bookmarkId) {
        setCurrentBookmarkId(data.bookmarkId);
      } else if (!data?.isBookmarked) {
        setCurrentBookmarkId(undefined);
      }

      // 북마크 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({
        queryKey: ['bookmark', 'story', storyId],
      });
      queryClient.invalidateQueries({
        queryKey: ['storyDetail', storyId, { increaseView: false }],
      });
    },
  });

  const handleToggle = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    mutation.mutate(isBookmarked);
    onToggle?.(!isBookmarked);
  };

  const buttonContent = (
    <BookmarkIcon
      width={24}
      height={24}
      fill={isBookmarked ? 'black' : 'none'}
      stroke={isBookmarked ? 'none' : 'currentColor'}
      strokeWidth={isBookmarked ? 0 : 1.5}
    />
  );

  if (showBackground) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={css({
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 'full',
          padding: '6px',
          transition: 'all 0.2s ease',
          _hover: {
            background: 'rgba(255, 255, 255, 1)',
            transform: 'scale(1.1)',
          },
        })}
        aria-label={isBookmarked ? '북마크 제거' : '북마크 추가'}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={css({
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        _hover: {
          transform: 'scale(1.1)',
        },
      })}
      aria-label={isBookmarked ? '북마크 제거' : '북마크 추가'}
    >
      {buttonContent}
    </button>
  );
}
