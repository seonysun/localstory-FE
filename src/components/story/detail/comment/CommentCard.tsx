import React, { useMemo } from 'react';
import ActionButtons from '@components/story/detail/comment/ActionButtons';
import CommentContent from '@components/story/detail/comment/CommentContent';
import ReplyInput from '@components/story/detail/comment/ReplyInput';
import UserHeaderInfo from '@components/story/detail/UserHeaderInfo';
import { useCommentStore } from '@store/useCommentStore';

import { css } from '@root/styled-system/css';

type Props = {
  comment: {
    id: number;
    title: string;
    parentId: number | null;
  };
  depth: number;
};

export default function CommentCard({ comment, depth }: Props) {
  const {
    inputMode,
    setInputMode,
    onSubmit,
    onCancel,
    onDelete,
    onChange,
    comments,
  } = useCommentStore();

  const isEditing =
    inputMode.mode === 'edit' && inputMode.payload.commentId === comment.id;
  const isReplying =
    inputMode.mode === 'reply' && inputMode.payload.parent === comment.id;
  const isPendingDelete =
    inputMode.mode === 'edit' &&
    inputMode.payload.commentId === comment.id &&
    !inputMode.payload.value;

  const childComments = useMemo(() => {
    return comments.filter(c => c.parentId === comment.id);
  }, [comments, comment.id]);

  return (
    <div
      style={{ marginLeft: `${depth * 16}px`, borderBottom: '1px solid grey' }}
    >
      <div className={css({ mt: 6 })}>
        <div className={css({ display: 'flex' })}>
          <UserHeaderInfo
            userName="이관용"
            createdAt="2025-05-27"
            userProfileImage="ㅇㅁㄴㅇㄴㅁ"
          />
          <ActionButtons
            isPendingDelete={isPendingDelete}
            onReply={() =>
              setInputMode({
                mode: 'reply',
                payload: { parent: comment.id, value: '' },
              })
            }
            onEdit={() =>
              setInputMode({
                mode: 'edit',
                payload: { commentId: comment.id, value: comment.title },
              })
            }
            onDeleteConfirm={() =>
              setInputMode({ mode: 'edit', payload: { commentId: comment.id } })
            }
            onDelete={onDelete}
          />
        </div>
        <CommentContent
          comment={comment}
          isEditing={isEditing}
          value={isEditing ? (inputMode.payload.value ?? '') : comment.title}
        />
      </div>

      {isReplying && (
        <ReplyInput
          value={inputMode.payload.value ?? ''}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}

      {depth < 2 && (
        <div className={css({ marginLeft: 16 })}>
          {childComments.map(child => (
            <CommentCard key={child.id} comment={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
