'use client';

import React from 'react';
import CommentInputBox from '@components/story/detail/comment/CommentInputBox';
import PostReactionButtons from '@components/story/detail/post/PostReactionButtons';
import StoryDetailCommentCard from '@components/story/detail/sections/StoryDetailCommentCard';
import UserHeaderInfo from '@components/story/detail/UserHeaderInfo';
import { Button } from '@components/ui/common/buttons/Button';
import { useCommentStore } from '@store/useCommentStore';

import { css } from '@root/styled-system/css';

/**
 * 댓글 전체 기능을 담당하는 컴포넌트로,
 * 유저 정보, 공감 버튼, 댓글 리스트 및 입력창을 포함하며
 * 댓글 상태 및 입력 모드를 useComment와 useInputMode 훅을 통해 관리한다.
 */
function StoryDetailCommentSection() {
  const { rootInputValue, setRootInputValue, onSubmitRoot } = useCommentStore();
  return (
    <article>
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <UserHeaderInfo userName="이관용" createdAt="2025-05-27" />
        <div className={css({ marginLeft: 'auto' })}>
          <div
            className={css({
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            })}
          >
            <Button
              aria-label="팔로우 버튼"
              size="sm"
              color="outline"
              onClick={() => alert('팔로우 하는 버튼')}
            >
              Follow
            </Button>
            <Button
              aria-label="글수정 버튼"
              size="sm"
              color="outline"
              onClick={() => alert('글 쓰기 수정으로 가는 버튼')}
            >
              수정
            </Button>
            <Button
              aria-label="글삭제 버튼"
              size="sm"
              color="outline"
              onClick={() => alert('글을 삭제하는 버튼')}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>

      <PostReactionButtons />
      <StoryDetailCommentCard />

      <CommentInputBox
        value={rootInputValue}
        onChange={e => setRootInputValue(e.target.value)}
        onSubmit={onSubmitRoot}
      />
    </article>
  );
}

export default StoryDetailCommentSection;
