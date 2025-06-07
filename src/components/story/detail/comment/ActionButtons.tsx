import { buttonWrapperStyle } from '@components/story/detail/comment.recipe';
import { Button } from '@components/ui/common/buttons/Button';

// 댓글 답글 / 수정 / 삭제 버튼 컴포넌트 서버 api 나오면 뮤테이션 처리 관심사 분리 !
function ActionButtons({
  isPendingDelete,
  onReply,
  onEdit,
  onDeleteConfirm,
  onDelete,
}: {
  isPendingDelete: boolean;
  onReply: () => void;
  onEdit: () => void;
  onDeleteConfirm: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={buttonWrapperStyle()}>
      <Button size="sm" color="outline" onClick={onReply}>
        답글
      </Button>
      <Button size="sm" color="outline" onClick={onEdit}>
        수정
      </Button>
      <Button size="sm" color="outline" onClick={onDeleteConfirm}>
        삭제
      </Button>
      {isPendingDelete && <Button onClick={onDelete}>확인</Button>}
    </div>
  );
}
export default ActionButtons;
