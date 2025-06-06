'use client';

import { ReactNode, useRef } from 'react';

import { DangerIcon } from '@/components/icons';
import { Button } from '@/components/ui/common/buttons/Button';
import { flex } from '@/components/ui/common/cards/card.recipe';
import {
  modalContent,
  modalText,
  modalWrapper,
} from '@/components/ui/common/modals/modal.recipe';
import useClickOutside from '@/hooks/useClickOutside';
import { useModalStore } from '@/store/useModalStore';

type ModalProps = {
  title?: string;
  content?: ReactNode;
  type?: 'one' | 'two';
  onConfirm?: () => void;
  children?: ReactNode;
};

/**
 * Modal 컴포넌트
 *
 * @component
 * @example
 * <Modal
 *   title="정말 삭제하시겠어요?"
 *   content={
 *     <>
 *       탈퇴 시 모든 정보가 삭제되며,
 *       <br />
 *       복구는 불가능합니다.
 *     </>
 *   }
 * />
 *
 * @param {string} [title] - 모달 제목 텍스트
 * @param {ReactNode} [content] - 모달 설명 텍스트 혹은 JSX 콘텐츠
 * @param {'one' | 'two'} [type='two'] - 버튼 개수 타입 (one: 확인만, two: 취소 + 확인)
 * @param {() => void} [onConfirm] - 확인 버튼 클릭 시 실행할 콜백 함수
 * @param {ReactNode} [children] - 전체 모달 콘텐츠를 커스터마이징할 때 사용
 */

function Modal({
  title,
  content,
  type = 'two',
  onConfirm,
  children,
}: ModalProps) {
  const { close } = useModalStore();

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, close);

  return (
    <div className={modalWrapper()}>
      {children || (
        <div ref={modalRef} className={modalContent()}>
          <div className={flex({ align: 'center', gap: 'xl' })}>
            <DangerIcon width={44} height={44} fill="red" />
            <div className={flex({ gap: 'md', px: 'lg' })}>
              <p className={modalText({ text: 'pageTitle' })}>{title}</p>
              <p className={modalText({ text: 'body3', color: 'gray400' })}>
                {content}
              </p>
            </div>
          </div>
          <div className={flex({ direction: 'row', gap: 'sm' })}>
            {type === 'two' && (
              <Button onClick={close} color="outlineSoft" size="md" radius="md">
                취소
              </Button>
            )}
            <Button onClick={onConfirm} color="primary" size="md" radius="md">
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
