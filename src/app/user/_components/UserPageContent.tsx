import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import { followsOption } from '@api/options/followsOption';
import { Button } from '@components/ui/common/buttons/Button';
import { useFollowStatus } from '@hooks/useFollowStatus';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { css } from '@root/styled-system/css';

export interface UserStory {
  id: string;
  title: string;
  content: string;
}

export interface UserProfile {
  id: number;
  nickname: string;
  profileImage: string;
  stories: UserStory[];
}

export interface UserSearchResponse {
  users: UserProfile[];
}

export interface StoryImageResponse {
  results: { imageUrl: string }[];
}

function UserPageContent() {
  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');
  const { data, isError } = useQuery<UserSearchResponse>({
    queryKey: ['userProfile', nickname],
    queryFn: () =>
      instance
        .get(`${ENDPOINTS.SEARCH.LIST}?query=${nickname}`)
        .then(res => res.data),
    enabled: !!nickname,
  });

  const user = data?.users?.[0];
  const stories = user?.stories || [];
  const defaultImg = '/images/default-thumbnail.png';

  const storyImageQueries = useQueries({
    queries: stories.map(story => ({
      queryKey: ['storyImage', story.id],
      queryFn: () =>
        instance
          .get(ENDPOINTS.STORY_IMAGE.LIST(Number(story.id)))
          .then(res => res.data as StoryImageResponse),
      enabled: !!story.id,
    })),
  });

  const storiesWithImages = stories.map((story, idx) => {
    const images = storyImageQueries[idx]?.data?.results;
    const imageUrl =
      images && images.length > 0 ? images[0].imageUrl : defaultImg;
    return { ...story, imageUrl };
  });

  const { isFollowing, followId } = useFollowStatus(user?.nickname);

  const queryClient = useQueryClient();

  const followMutation = useMutation({
    ...followsOption.postFollows(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow'] });
    },
  });

  const unfollowMutation = useMutation({
    ...followsOption.deleteFollows(followId ? String(followId) : ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow'] });
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      if (followId) unfollowMutation.mutate();
    } else if (user?.nickname)
      followMutation.mutate({ nickname: user?.nickname });
  };

  if (!user) return <div>유저 없음</div>;
  if (isError) return <div>에러</div>;
  return (
    <section className={css({ mt: 24, maxWidth: 700, mx: 'auto', mb: 24 })}>
      <article
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          mb: 12,
          borderBottom: '1px solid #eee',
          pb: 8,
        })}
      >
        <Image
          src={user.profileImage}
          alt={user.nickname}
          width={120}
          height={120}
          className={css({
            objectFit: 'cover',
            borderRadius: 'full',
            border: '2px solid #ddd',
            bg: '#fafafa',
          })}
        />
        <div>
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              mb: 2,
            })}
          >
            <p className={css({ fontWeight: 'bold', fontSize: 24 })}>
              {user.nickname}
            </p>
          </div>
          <Button
            size="sm"
            color="outlineSoft"
            aria-label="팔로우 버튼"
            onClick={handleFollow}
            disabled={followMutation.isPending || unfollowMutation.isPending}
          >
            {isFollowing ? 'unFollow' : 'Follow'}
          </Button>
          <div
            className={css({
              display: 'flex',
              gap: 8,
              mt: 2,
              color: 'gray.600',
              fontSize: 16,
            })}
          >
            <span>
              게시물 <b>{stories.length}</b>
            </span>
          </div>
        </div>
      </article>

      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 4,
        })}
      >
        {storiesWithImages.length === 0 ? (
          <div
            className={css({
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: 'gray.500',
              py: 24,
            })}
          >
            게시물이 없습니다.
          </div>
        ) : (
          storiesWithImages.map(story => (
            <Link key={story.id} href={`/story/${story.id}`}>
              <div
                key={story.id}
                className={css({
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  borderRadius: 'md',
                  border: '1px solid #eee',
                  mb: 2,
                  bg: '#fafafa',
                  cursor: 'pointer',
                  _hover: { opacity: 0.8 },
                })}
              >
                <Image
                  src={story.imageUrl || defaultImg}
                  alt={story.title}
                  width={300}
                  height={300}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultImg;
                  }}
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default UserPageContent;
