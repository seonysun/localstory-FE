'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@components/ui/common/buttons/Button';
import { useFollowStatus } from '@hooks/useFollowStatus';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { followsOption } from '@/api/options/followsOption';
import { storyOption } from '@/api/options/storyOption';
import Modal from '@/components/ui/common/modals/Modal';
import { useModalStore } from '@/store/useModalStore';

import { css } from '@root/styled-system/css';

type Props = {
  mode: 'comment' | 'story';
  isMine: boolean;
  userNickname?: string;
};

function StoryContentActions({ mode, isMine, userNickname }: Props) {
  const router = useRouter();
  const params = useParams();
  const id = params?.storyId as string;
  const { isFollowing, followId } = useFollowStatus(userNickname);

  const queryClient = useQueryClient();

  const followMutation = useMutation({
    ...followsOption.postFollows(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow'] });
      toast.success('팔로우에 성공 했습니다.');
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['follow'] });
      toast.error('팔로우에 실패했습니다.');
    },
  });

  const unfollowMutation = useMutation({
    ...followsOption.deleteFollows(followId ? String(followId) : ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow'] });
      toast.success('팔로우 취소를 했습니다.');
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['follow'] });
      toast.error('팔로우에 취소에 실패했습니다.');
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      if (followId) unfollowMutation.mutate();
    } else if (userNickname) followMutation.mutate({ nickname: userNickname });
  };

  const [delError, setDelError] = useState<string | null>(null);
  const deleteMutation = useMutation({
    ...storyOption.deleteStory(id),
    onSuccess: () => {
      close();
      router.push('/story');
      toast.success('게시글 삭제에 성공했습니다!');
    },
    onError: error => {
      close();
      setDelError(error.message);
      toast.error('게시글 삭제에 실패했습니다!');
    },
  });

  const { open, isOpen, close } = useModalStore();

  return (
    <>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          ml: 'auto',
        })}
      >
        <Button
          size="sm"
          color="outlineSoft"
          aria-label="팔로우 버튼"
          onClick={handleFollow}
          disabled={followMutation.isPending || unfollowMutation.isPending}
        >
          {isFollowing ? 'unFollow' : 'Follow'}
        </Button>
        {mode === 'story' && isMine && (
          <>
            <Button
              size="sm"
              color="custom"
              className={css({
                _hover: {
                  bg: 'blue.50',
                },
              })}
              aria-label="글 수정 버튼"
              onClick={() => router.push(`/story/post/${id}`)}
            >
              수정
            </Button>
            <Button
              size="sm"
              color="custom"
              className={css({
                _hover: {
                  bg: 'blue.50',
                  color: 'red',
                },
              })}
              aria-label="글 삭제 버튼"
              onClick={() => open()}
            >
              삭제
            </Button>
          </>
        )}
      </div>
      {delError && (
        <Modal
          title="에러"
          content={delError}
          type="one"
          onConfirm={() => setDelError(null)}
        />
      )}
      {isOpen && (
        <Modal
          title="정말 삭제하시겠어요?"
          content={
            <>
              삭제 시 모든 정보가 삭제되며,
              <br />
              복구는 불가능합니다.
            </>
          }
          onConfirm={() => {
            deleteMutation.mutate();
          }}
        />
      )}
    </>
  );
}

export default StoryContentActions;
