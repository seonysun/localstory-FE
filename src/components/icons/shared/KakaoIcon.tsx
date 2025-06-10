import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

/**
 * @component KaKaoIcon
 * @description 카카오 로그인용 아이콘.
 */
export const KakaoIcon = ({ className, ...props }: IconProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      fill="#000000"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.00008 0.599976C4.02924 0.599976 6.10352e-05 3.71293 6.10352e-05 7.55226C6.10352e-05 9.94 1.55847 12.0449 3.93159 13.2969L2.93309 16.9445C2.84487 17.2668 3.21348 17.5237 3.49653 17.3369L7.8734 14.4482C8.24276 14.4838 8.61814 14.5046 9.00008 14.5046C13.9705 14.5046 18 11.3918 18 7.55226C18 3.71293 13.9705 0.599976 9.00008 0.599976Z"
    />
  </svg>
);

export default KakaoIcon;
