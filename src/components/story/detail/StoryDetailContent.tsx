'use client';

import React from 'react';
import Image from 'next/image';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import { storyOption } from '@api/options/storyOption';
import { EyeIcons, HeartIcon } from '@components/icons';
import CommentSection from '@components/story/detail/comment/CommentSection';
import UserInfo from '@components/story/detail/UserInfo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@util/date';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { StoryType } from '@/types/story.types';

import StoryDetailSkeleton from './StoryDetailSkeleton';

import 'swiper/css';
// eslint-disable-next-line import/order
import { css } from '@root/styled-system/css';

import 'swiper/css/pagination';

function StoryDetailContent({ storyId }: { storyId: string }) {
  const errorDefaultImg = '/images/errorDefaultImg.jpg';
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<StoryType>({
    queryKey: ['storyDetail', storyId, { increaseView: true }],
    queryFn: ({ queryKey }) => {
      const [_key, storyId, options] = queryKey as [
        string,
        string,
        { increaseView?: boolean },
      ];
      const url = options?.increaseView
        ? `${ENDPOINTS.STORY.DETAIL(storyId)}?increase_view=true`
        : ENDPOINTS.STORY.DETAIL(storyId);
      return instance.get(url).then(res => res.data);
    },
  });
  const {
    createdAt,
    title,
    content,
    userNickname,
    userProfileImage,
    isLiked,
    likeCount,
    viewCount,
  } = data ?? {};

  const mutation = useMutation({
    ...storyOption.postLikeStory(storyId),
    onMutate: () => {
      queryClient.setQueryData<StoryType>(
        ['storyDetail', storyId, { increaseView: true }],
        old => {
          if (!old) return old;
          return {
            ...old,
            isLiked: !old?.isLiked,
            likeCount: Number(old?.likeCount ?? 0) + (old?.isLiked ? -1 : 1),
          };
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['storyDetail', storyId, { increaseView: false }],
      });
    },
  });

  const onToggle = (newLiked: boolean | undefined) => {
    if (newLiked === undefined) return;
    mutation.mutate(newLiked);
  };
  const displayImages =
    data?.storyImages && data?.storyImages.length > 0
      ? data.storyImages
      : [{ imageUrl: errorDefaultImg, imageId: 'default' }];

  if (isError) return <p>Error...</p>;
  if (isLoading) return <StoryDetailSkeleton />;
  return (
    <article>
      <div className={css({ mb: 12 })}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          navigation={false}
          style={{ width: '100%' }}
        >
          {displayImages.map(image => (
            <SwiperSlide key={image.imageId}>
              <div
                className={css({
                  width: '100%',
                  aspectRatio: '4 / 5',
                  position: 'relative',
                  background: '#f2f2f2',
                })}
              >
                <Image
                  src={image.imageUrl}
                  alt="StoryDetail"
                  fill
                  className={css({
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  })}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = errorDefaultImg;
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div>
          <p className={css({ mt: 12, mb: 1, textStyle: 'body2' })}>
            {createdAt ? formatDate(createdAt) : undefined}
          </p>
          <h1 className={css({ textStyle: 'headline3', mb: 8 })}>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
      <UserInfo
        mode="story"
        createdAt={createdAt}
        userNickname={userNickname}
        userProfileImage={userProfileImage}
      />
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          mt: 12,
          mb: 12,
          gap: 2,
        })}
      >
        <button
          type="button"
          className={css({ cursor: 'pointer' })}
          onClick={() => onToggle(!isLiked)}
        >
          <HeartIcon
            fill={isLiked ? 'red' : 'none'}
            aria-label={`좋아요  ${likeCount}개`}
          />
        </button>
        <span>{likeCount}</span>
        <EyeIcons aria-label={`조회수 ${viewCount ?? 0}개`} />
        <span>{viewCount ?? 0}</span>
      </div>
      <CommentSection storyId={storyId} />
    </article>
  );
}

export default StoryDetailContent;
