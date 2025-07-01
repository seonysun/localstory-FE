'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getMyStories } from '@/api/options/storyApi';
import { Button } from '@/components/ui/common/buttons/Button';
import WideCard from '@/components/ui/common/cards/WideCard';
import WideCardContent from '@/components/ui/common/cards/WideCardContent';
import { Story } from '@/types/story';

import { css } from '@root/styled-system/css';

export default function MyStoryPage() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const fetchStories = useCallback(async () => {
    try {
      setLoading(true);
      const fetchFunction = getMyStories(page);
      const response = await fetchFunction();

      let storyData: Story[] = [];
      let next = false;
      if (Array.isArray(response)) {
        storyData = response;
      } else if (response && 'results' in response) {
        storyData = response.results || [];
        next = !!response.next;
      }

      if (page === 1) {
        setStories(storyData);
      } else {
        setStories(prev => [...prev, ...storyData]);
      }
      setHasNext(next);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('스토리 불러오기 실패:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleEditClick = (storyId: number) => {
    router.push(`/story/post/${storyId}`);
  };

  const handleCardClick = (storyId: number) => {
    router.push(`/story/${storyId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '. ')
      .replace(/\.$/, '');
  };

  if (loading && page === 1) {
    return (
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
        })}
      >
        <p className={css({ textStyle: 'body2', color: 'gray.500' })}>
          로딩 중...
        </p>
      </div>
    );
  }

  if (stories.length === 0 && !loading) {
    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          gap: '16px',
        })}
      >
        <p className={css({ textStyle: 'body2', color: 'gray.500' })}>
          아직 작성한 스토리가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={css({ width: '100%' })}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        {stories.map(story => {
          const firstImage =
            story.storyImages?.[0]?.imageUrl || '/images/default-thumbnail.png';
          const storyDate = formatDate(story.createdAt);

          return (
            <WideCard key={story.storyId} image={firstImage}>
              <WideCardContent
                title={story.title}
                subtitle={storyDate}
                date
                footerType="feeling"
                footerText={story.emoji}
                action={
                  <Button
                    color="primary"
                    size="sm"
                    radius="sm"
                    onClick={e => {
                      e.stopPropagation();
                      handleEditClick(story.storyId);
                    }}
                  >
                    Edit
                  </Button>
                }
                onClick={() => handleCardClick(story.storyId)}
              />
            </WideCard>
          );
        })}
      </div>
      {hasNext && (
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px',
          })}
        >
          <Button
            color="black"
            size="sm"
            radius="sm"
            onClick={() => setPage(prev => prev + 1)}
            disabled={loading}
          >
            {loading ? '로딩 중...' : '더보기'}
          </Button>
        </div>
      )}
    </div>
  );
}
