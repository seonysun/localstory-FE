import React, { Dispatch, SetStateAction } from 'react';
import { storyOption } from '@api/options/storyOption';
import { HeartIcon } from '@components/icons';
import CommentForm from '@components/story/detail/comment/CommentForm';
import UserInfo from '@components/story/detail/UserInfo';
import { Button } from '@components/ui/common/buttons/Button';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { css } from '@root/styled-system/css';

import { CommentStory, InputMode } from '@/types/story.types';

type Props = {
  comment: CommentStory;
  allComments: CommentStory[];
  setMode: Dispatch<SetStateAction<InputMode>>;
  onEditClick: () => void;
  onReplyClick: () => void;
  depth?: number;
  mode: 'edit' | 'reply' | 'none';
  modePayload: { targetId: number | null; parent: number | null };
  storyId: string;
};

function CommentCard({
  comment,
  allComments,
  setMode,
  onEditClick,
  onReplyClick,
  depth = 0,
  mode,
  modePayload,
  storyId,
}: Props) {
  const children = allComments.filter(
    item => item.parent === comment?.commentId,
  );
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const isMine = user?.nickname === comment.userNickname;
  const deleteMutation = useMutation({
    ...storyOption.deleteComment(
      String(comment?.storyId),
      String(comment?.commentId),
    ),
    onMutate: () => {
      queryClient.setQueryData<CommentStory[]>(
        ['comment', String(comment.storyId)],
        old =>
          old ? old.filter(item => item.commentId !== comment.commentId) : [],
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comment', comment?.storyId],
      });
    },
  });

  const mutation = useMutation({
    ...storyOption.postCommentLike(
      comment?.storyId,
      String(comment?.commentId),
    ),
    onMutate: () => {
      queryClient.setQueryData<CommentStory[]>(
        ['comment', String(comment?.storyId)],
        old => {
          if (!old) return old;
          return old.map(item =>
            item?.commentId === comment?.commentId
              ? {
                  ...item,
                  isLiked: !item.isLiked,
                  likeCount: item.isLiked
                    ? item.likeCount - 1
                    : item.likeCount + 1,
                }
              : item,
          );
        },
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comment', String(comment?.storyId)],
      });
    },
  });
  const onToggle = (newLiked: boolean) => {
    mutation.mutate(newLiked);
  };
  const onDelete = () => {
    deleteMutation.mutate();
  };

  const isReplyFormOpen =
    mode === 'reply' && modePayload.parent === comment.commentId;
  const isEditFormOpen =
    mode === 'edit' && modePayload.targetId === comment.commentId;

  return (
    <div
      className={css({
        mb: 8,
        mt: 8,
        p: { base: 4, sm: 2 },
        borderLeft: depth > 0 ? '3px solid #cbd5e1' : 'none',
        maxWidth: { base: 600, sm: '100%' },
        fontSize: { base: 'md', sm: 'sm' },
        marginLeft: depth > 0 ? `clamp(8px, ${depth * 20}px, 40px)` : 0,
      })}
    >
      <UserInfo
        mode="comment"
        createdAt={comment?.createdAt}
        userNickname={comment?.userNickname}
        userProfileImage={comment?.userProfileImage}
      />
      <div className={css({ mb: 4, mt: 4, ml: 4 })}>
        <p>{comment?.content}</p>
      </div>
      <Button
        size="sm"
        onClick={() => onToggle(!comment?.isLiked)}
        color="custom"
        disabled={mutation.isPending}
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 2,
        })}
      >
        <HeartIcon
          width={20}
          height={20}
          fill={comment?.isLiked ? 'red' : 'none'}
          aria-label={`좋아요 ${comment?.likeCount ?? 0}개`}
        />
        <span>{comment?.likeCount}</span>
      </Button>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          width: '40%',
        })}
      >
        <Button
          onClick={onReplyClick}
          size="sm"
          className={css({
            _hover: {
              bg: 'blue.50',
            },
          })}
          color="custom"
          aria-label="댓글 달기"
        >
          답글
        </Button>
        {isMine && (
          <>
            <Button
              onClick={onEditClick}
              size="sm"
              className={css({
                _hover: {
                  bg: 'blue.50',
                },
              })}
              color="custom"
              aria-label="댓글 수정"
            >
              수정
            </Button>
            <Button
              onClick={onDelete}
              size="sm"
              className={css({
                _hover: {
                  bg: 'blue.50',
                  color: 'red',
                },
              })}
              disabled={deleteMutation.isPending}
              color="custom"
              aria-label="댓글 삭제"
            >
              삭제
            </Button>
          </>
        )}
      </div>
      <div className={css({ borderBottom: '2px solid #e5e7eb', mt: 2 })} />
      {isReplyFormOpen && (
        <CommentForm
          storyId={storyId}
          mode="reply"
          parentId={comment.commentId}
          targetId={null}
          onCancel={() =>
            setMode({ mode: 'none', payload: { targetId: null, parent: null } })
          }
          onSuccess={() =>
            setMode({ mode: 'none', payload: { targetId: null, parent: null } })
          }
        />
      )}
      {isEditFormOpen && (
        <CommentForm
          storyId={storyId}
          mode="edit"
          parentId={null}
          targetId={comment.commentId}
          onCancel={() =>
            setMode({ mode: 'none', payload: { targetId: null, parent: null } })
          }
          onSuccess={() =>
            setMode({ mode: 'none', payload: { targetId: null, parent: null } })
          }
        />
      )}
      {children.length > 0 &&
        children.map(item => (
          <CommentCard
            key={item.commentId}
            comment={item}
            depth={depth + 1}
            setMode={setMode}
            allComments={allComments}
            onEditClick={() =>
              setMode({
                mode: 'edit',
                payload: {
                  targetId: item?.commentId,
                  parent: null,
                },
              })
            }
            onReplyClick={() =>
              setMode({
                mode: 'reply',
                payload: {
                  targetId: null,
                  parent: item?.commentId,
                },
              })
            }
            mode={mode}
            modePayload={modePayload}
            storyId={storyId}
          />
        ))}
    </div>
  );
}

export default CommentCard;
