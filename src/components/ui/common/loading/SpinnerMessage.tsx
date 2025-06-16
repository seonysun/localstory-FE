'use client';

import { spinner, spinnerContainer, spinnerText } from './spinner.recipe';

type Props = {
  /**
   * 사용자에게 보여줄 로딩 메시지
   * @default "로딩 중입니다..."
   */
  message?: string;
};

/**
 * 로딩 인디케이터와 메시지를 함께 표시하는 컴포넌트
 */
export const SpinnerMessage = ({ message = '로딩 중입니다...' }: Props) => {
  return (
    <div className={spinnerContainer()}>
      <div className={spinner()} />
      <p className={spinnerText()}>{message}</p>
    </div>
  );
};
