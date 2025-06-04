'use client';

import { ReactNode } from 'react';
import {
  BackButton,
  Title,
  Wrapper,
} from '@components/ui/common/pageHeader/pageHeader.recipe';

import { BackIcon } from '@/components/icons';

/**
 * `PageHeader`는 모바일 페이지 상단에 고정된 헤더 컴포넌트입니다.
 *
 * - 좌측에는 항상 `<` 아이콘(뒤로가기)이 표시됩니다.
 * - 중앙에는 `title` 텍스트가 위치합니다.
 * - 뒤로가기 버튼 클릭 시 `onBackButtonClick`이 전달되면 실행되며,
 *   전달되지 않은 경우 기본적으로 `window.history.back()`을 수행합니다.
 *
 * @example
 * ```tsx
 * <PageHeader title="북마크" />
 * ```
 *
 * @param title 페이지 타이틀 텍스트
 * @param onBackButtonClick 뒤로가기 버튼 클릭 시 실행할 콜백 함수 (선택)
 */
type PageHeaderProps = {
  /** 페이지 타이틀 텍스트 */
  title?: string;

  /** 뒤로가기 버튼 클릭 시 실행할 콜백 (기본: window.history.back()) */
  onBackButtonClick?: () => void;
  children?: ReactNode;
};

function PageHeader({ title, onBackButtonClick, children }: PageHeaderProps) {
  return (
    <div className={Wrapper()}>
      <button
        type="button"
        className={BackButton()}
        onClick={
          onBackButtonClick ??
          (() => {
            window.history.back();
          })
        }
      >
        <BackIcon />
      </button>
      {children || <h1 className={Title()}>{title}</h1>}
    </div>
  );
}

export default PageHeader;
