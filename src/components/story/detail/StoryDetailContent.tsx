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
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { StoryType } from '@/types/story.types';

import { css } from '@root/styled-system/css';

function StoryDetailContent({ storyId }: { storyId: string }) {
  const errorDefaultImg = '/images/errorDefaultImg.jpg';
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<StoryType>({
    queryKey: ['storyDetail', storyId],
    queryFn: () =>
      instance.get(ENDPOINTS.STORY.DETAIL(storyId)).then(res => res.data),
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
      queryClient.setQueryData<StoryType>(['storyDetail'], old => {
        if (!old) return old;
        return {
          ...old,
          isLiked: !old?.isLiked,
          likeCount: Number(old?.likeCount ?? 0) + (old?.isLiked ? 1 : -1),
        };
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['storyDetail', storyId],
      });
    },
  });

  const onToggle = (newLiked: boolean | undefined) => {
    if (newLiked === undefined) return;
    mutation.mutate(newLiked);
  };

  if (isError) return <p>Error...</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <article>
      <div className={css({ mb: 12 })}>
        <Swiper
          spaceBetween={10}
          slidesPerView={1.2}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          navigation={false}
        >
          {data?.storyImages.map(image => (
            <SwiperSlide key={image.imageId}>
              <Image
                src={image.imageUrl}
                alt="StoryDetail"
                width={1080}
                height={600}
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
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <p className={css({ mt: 12, mb: 1, textStyle: 'body2' })}>
            {createdAt ? new Date(createdAt).toLocaleDateString() : undefined}
          </p>
          <h1 className={css({ textStyle: 'headline3', mb: 12 })}>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
      <UserInfo
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
