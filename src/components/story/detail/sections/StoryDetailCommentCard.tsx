import React from 'react';
import { commentListWrapperStyle } from '@components/story/detail/comment.recipe';
import CommentCard from '@components/story/detail/comment/CommentCard';
import { useCommentStore } from '@store/useCommentStore';

import { css } from '@root/styled-system/css';

function StoryDetailCommentCard() {
  const { comments } = useCommentStore();
  const rootComments = comments.filter(c => c.parentId === null);

  return (
    <div className={commentListWrapperStyle()}>
      {rootComments.length > 0 ? (
        rootComments.map(comment => (
          <CommentCard key={comment.id} comment={comment} depth={1} />
        ))
      ) : (
        <p className={css({ textAlign: 'center', color: 'gray.100', mb: 24 })}>
          아직 댓글이 없어요. <br />
          가장 먼저 댓글을 달아보세요.
        </p>
      )}
    </div>
  );
}

export default StoryDetailCommentCard;
