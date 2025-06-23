'use client';

import React, { useState } from 'react';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import CommentCard from '@components/story/detail/comment/CommentCard';
import CommentForm from '@components/story/detail/comment/CommentForm';
import { useQuery } from '@tanstack/react-query';

import type { CommentStory, InputMode } from '@/types/story.types';

function CommentSection({ storyId }: { storyId: string }) {
  const { data, isLoading, isError } = useQuery<CommentStory[]>({
    queryKey: ['comment', storyId],
    queryFn: () =>
      instance.get(ENDPOINTS.COMMENT.LIST(storyId)).then(res => res.data),
  });
  const [mode, setMode] = useState<InputMode>({
    mode: 'none',
    payload: {
      targetId: null,
      parent: null,
    },
  });
  const rootComment = data?.filter(comment => !comment.parent);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div>
      {data &&
        data.length > 0 &&
        rootComment?.map(comment => (
          <CommentCard
            key={comment.commentId}
            allComments={data}
            comment={comment}
            setMode={setMode}
            onEditClick={() =>
              setMode({
                mode: 'edit',
                payload: {
                  targetId: comment.commentId,
                  parent: null,
                },
              })
            }
            onReplyClick={() =>
              setMode({
                mode: 'reply',
                payload: {
                  targetId: null,
                  parent:
                    comment.parent !== null
                      ? comment.parent
                      : comment.commentId,
                },
              })
            }
            mode={mode.mode}
            modePayload={mode.payload}
            storyId={storyId}
          />
        ))}
      <CommentForm
        key={`${mode.mode}-${mode.payload.targetId}-${mode.payload.parent}`}
        storyId={storyId}
        mode="none"
        parentId={null}
        targetId={null}
      />
    </div>
  );
}

export default CommentSection;
