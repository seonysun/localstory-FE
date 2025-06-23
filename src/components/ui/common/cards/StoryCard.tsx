'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { storyOption } from '@api/options/storyOption';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EyeIcons, HeartIcon } from '@/components/icons';
import {
  cardImage,
  cardWrapper,
  flex,
  gridImageWrapper,
  subText,
  titleText,
} from '@/components/ui/common/cards/card.recipe';
import type { StoryCardProps, StoryQueryData } from '@/types/story.types';

import { css, cx } from '@root/styled-system/css';

function StoryCard({ story }: StoryCardProps) {
  const errorDefaultImg = '/images/errorDefaultImg.jpg';
  const {
    storyId,
    likeCount,
    viewCount,
    isLiked,
    userNickname,
    createdAt,
    storyImages = [],
    userProfileImage,
    title,
    content,
  } = story;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...storyOption.postLikeStory(storyId),
    onMutate: async () => {
      queryClient.setQueryData<StoryQueryData>(['story'], old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            results: page.results.map(item =>
              item.storyId === storyId
                ? {
                    ...item,
                    likeCount:
                      Number(item.likeCount ?? 0) + (item.isLiked ? -1 : 1),
                    isLiked: !item.isLiked,
                  }
                : item,
            ),
          })),
        };
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['story', storyId] });
    },
  });

  const onToggle = (newLiked: boolean | undefined) => {
    if (newLiked === undefined) return;
    mutation.mutate(newLiked);
  };
  const defaultUserImage = '/images/default-userImage.png';
  const [profileSrc, setProfileSrc] = useState(
    userProfileImage && userProfileImage.trim() !== ''
      ? userProfileImage
      : defaultUserImage,
  );
  const images = storyImages.map(img => img.imageUrl);
  const imageCount = images.length;
  const layout = String(Math.max(1, Math.min(imageCount, 5)));

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
      style={{ width: '100%' }}
    >
      <Link
        href={`/story/${storyId}`}
        passHref
        aria-label="글 상세 이동 버튼"
        className={css({ width: '100%' })}
      >
        {imageCount === 1 || imageCount === 0 ? (
          <div
            style={{
              width: '100%',
              height: '200px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 8,
            }}
          >
            <Image
              src={imageCount === 1 ? images[0] : errorDefaultImg}
              alt="스토리 이미지"
              fill
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                display: 'block',
              }}
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = errorDefaultImg;
              }}
            />
          </div>
        ) : (
          <div
            className={gridImageWrapper({
              layout: layout as '2' | '3' | '4' | '5',
            })}
            style={{ width: '100%', height: '200px', position: 'relative' }}
          >
            {images.slice(0, 5).map((src, i) => (
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
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = errorDefaultImg;
                  }}
                />
              </div>
            ))}
          </div>
        )}

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
          <Image
            src={profileSrc}
            alt="프로필"
            fill
            onError={() => {
              console.log('onError triggered for:', profileSrc);
              setProfileSrc(defaultUserImage);
            }}
          />
        </div>

        <div className={cx(css({ mt: 8, pl: '4' }))}>
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
      </Link>

      <div className={cx(css({ mt: 2 }), flex({ gap: 'md', p: 'lg' }))}>
        <p className={titleText({ color: 'gray600' })}>{title}</p>
        <p className={subText({ textStyle: 'label2', color: 'black' })}>
          {content}
        </p>

        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '2',
          })}
        >
          <button
            type="button"
            className={css({ cursor: 'pointer' })}
            onClick={() => onToggle(!isLiked)}
          >
            <HeartIcon
              fill={isLiked ? 'red' : 'none'}
              aria-label={`좋아요 ${likeCount ?? 0}개`}
            />
          </button>
          <span>{likeCount ?? 0}</span>
          <EyeIcons aria-label={`조회수 ${viewCount ?? 0}개`} />
          <span>{viewCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
