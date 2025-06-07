import React from 'react';
import {
  inputBoxStyle,
  replyButtonStyle,
  replyInputStyle,
} from '@components/story/detail/comment.recipe';
import { Button } from '@components/ui/common/buttons/Button';

// 대댓글 입력창 및 등록/취소 버튼을 렌더링하는 컴포넌트
function ReplyInput({
  value,
  onChange,
  onSubmit,
  onCancel,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className={replyInputStyle()}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="댓글을 입력하세요"
        className={inputBoxStyle()}
      />
      <Button
        onClick={onSubmit}
        className={replyButtonStyle()}
        disabled={!value.trim()}
      >
        등록
      </Button>
      <Button onClick={onCancel} className={replyButtonStyle()}>
        취소
      </Button>
    </div>
  );
}

export default ReplyInput;
