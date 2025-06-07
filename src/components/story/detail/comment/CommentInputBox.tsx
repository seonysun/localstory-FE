import React from 'react';
import { Button } from '@components/ui/common/buttons/Button';

import { css } from '@root/styled-system/css';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

// 루트 댓글을 입력창 버튼 컴포넌트
function CommentInputBox({ value, onChange, onSubmit }: Props) {
  return (
    <div className={css({ display: 'flex', justifyContent: 'center', mb: 12 })}>
      <input
        type="text"
        placeholder="댓글을 입력하세요"
        value={value}
        className={css({ width: '100%' })}
        onChange={onChange}
        aria-label="댓글 입력"
      />
      <Button
        size="sm"
        color="outlineSoft"
        onClick={onSubmit}
        className={css({ width: '20%' })}
        disabled={!value.trim()}
      >
        등록
      </Button>
    </div>
  );
}

export default CommentInputBox;
