'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@components/ui/common/buttons/Button';
import { useMutation } from '@tanstack/react-query';

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

  const followMutation = useMutation({
    ...followsOption.postFollows(),
  });

  const handleFollow = () => {
    followMutation.mutate({ nickname: userNickname });
  };

  const deleteMutation = useMutation({
    ...storyOption.deleteStory(id),
    onSuccess: () => {
      router.push('/story');
    },
  });

  const openModal = useModalStore(state => state.open);
  const isModalOpen = useModalStore(state => state.isOpen);

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
        {/* 팔로우 버튼 */}
        <Button
          size="sm"
          color="outlineSoft"
          aria-label="팔로우 버튼"
          onClick={handleFollow}
        >
          {followMutation.isPending ? '로딩중...' : 'Follows'}
        </Button>
        {/* 수정/삭제 버튼 */}
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
              onClick={openModal}
              disabled={deleteMutation.isPending}
            >
              삭제
            </Button>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title="정말 삭제하시겠어요?"
          content={
            <>
              삭제 시 모든 정보가 삭제되며,
              <br />
              복구는 불가능합니다.
            </>
          }
          onConfirm={() => deleteMutation.mutate()}
        />
      )}
    </>
  );
}

export default StoryContentActions;
