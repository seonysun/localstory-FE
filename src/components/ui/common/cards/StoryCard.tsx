'use client';

import Image from 'next/image';
import { storyOption } from '@api/options/storyOption';
import { Likes } from '@components/ui/common/toggles';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EyeIcons, HeartIcon } from '@/components/icons';
import {
  cardImage,
  cardWrapper,
  flex,
  gridImageWrapper,
  subText,
  titleText,
  topRightAbsolute,
} from '@/components/ui/common/cards/card.recipe';

import defaultUserProfile from '@images/default-userImage.png';

import { css, cx } from '@root/styled-system/css';

type StoryCardProps = {
  storyId: string;
  images?: string[];
  userProfile?: string;
  title?: string;
  content?: string;
  likeCount?: number;
  viewCount?: number;
  liked?: boolean;
  userNickname?: string;
  createdAt?: string;
};

type StoryListResponse = {
  data: StoryCardProps[];
};

function StoryCard({
  images,
  userProfile,
  title,
  content,
  storyId,
  likeCount,
  viewCount,
  liked,
  userNickname,
  createdAt,
}: StoryCardProps) {
  const queryClient = useQueryClient();
  const imageCount = images?.length ?? 0;
  const layout = String(Math.min(imageCount, 5));

  const queryKey = ['story'] as const;

  const mutation = useMutation({
    ...storyOption.postLikeStory(storyId),

    onMutate: async newLiked => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<StoryListResponse>(queryKey);

      queryClient.setQueryData<StoryListResponse>(queryKey, old => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map(item =>
            item.storyId === storyId
              ? {
                  ...item,
                  liked: newLiked,
                  likeCount: (item.likeCount ?? 0) + (newLiked ? 1 : -1),
                }
              : item,
          ),
        };
      });

      return { previous };
    },

    onError: (err, newLiked, context) => {
      queryClient.setQueryData<StoryListResponse>(queryKey, context?.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const onToggle = (newLiked: boolean) => {
    mutation.mutate(newLiked);
  };

  return (
    <div
      className={cardWrapper({
        position: 'relative',
        direction: 'col',
        align: 'start',
        gap: 'none',
        p: 'none',
        radius: 'sm',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          ml: 4,
          mt: 2,
        })}
      />
      <div
        className={gridImageWrapper({
          layout: layout as '1' | '2' | '3' | '4' | '5',
        })}
      >
        {images?.slice(0, 5).map((src, i) => (
          <div
            key={i}
            className={css({
              position: 'relative',
              ...(i === 0 && layout === '5' ? { gridRow: 'span 2' } : {}),
            })}
          >
            <Image
              src={src}
              alt={`스토리 이미지 ${i + 1}`}
              fill
              className={cardImage()}
            />
          </div>
        ))}
      </div>
      <div
        className={css({
          position: 'absolute',
          top: '175px',
          left: 4,
          w: '48px',
          h: '48px',
          borderRadius: 'full',
          overflow: 'hidden',
        })}
      >
        <Image src={userProfile || defaultUserProfile} alt="프로필" fill />
      </div>
      <div className={cx(css({ mt: 4, pl: '4' }))}>
        {userNickname && (
          <span className={subText({ color: 'muted' })}>{userNickname}</span>
        )}
        {createdAt && (
          <span>
            <span className={subText({ color: 'default' })}>
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </span>
        )}
      </div>
      <div className={cx(css({ mt: 2 }), flex({ gap: 'md', p: 'lg' }))}>
        <p className={titleText({ color: 'gray600' })}>{title}</p>
        <p className={subText({ textStyle: 'label2', color: 'black' })}>
          {content}
        </p>
        <span className={topRightAbsolute()}>
          <Likes liked={liked} onChange={onToggle} />
        </span>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
          })}
        >
          <HeartIcon aria-label={`좋아요 ${likeCount ?? 0}개`} />
          <span>{likeCount ?? 0}</span>
          <EyeIcons aria-label={`조회수 ${viewCount ?? 0}개`} />
          <span>{viewCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
