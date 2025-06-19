import React from 'react';
import { CommentsIcon, HeartIcon } from '@components/icons';
import { Button } from '@components/ui/common/buttons/Button';

import { css } from '@root/styled-system/css';

type Props = {
  likeCount: number | undefined;
};
// 게시글 하트 댓글 수를 보여줌 추후 서버 연결 시 뮤테이션 처리 관심사 분리
function PostReactionButtons({ likeCount = 0 }: Props) {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        mb: 12,
        borderBottom: '1px solid token(colors.gray.200)',
        width: '100%',
      })}
    >
      <Button size="sm" color="outline" aria-label="좋아요 버튼">
        <HeartIcon />
        {likeCount}
      </Button>
      <Button size="sm" color="outline" aria-label="댓글 수">
        <CommentsIcon fill="none" />0
      </Button>
    </div>
  );
}

export default PostReactionButtons;
