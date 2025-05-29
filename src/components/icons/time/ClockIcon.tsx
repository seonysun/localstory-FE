import React from 'react';
import { IconProps } from '@components/icons/iconProps';

function ClockIcon({
  width = 24,
  height = 24,
  fill = 'none',
  stroke,
  strokeWidth,
  ...props
}: IconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_54_1959)">
        <path
          d="M9.99984 5.00001V10L13.3332 11.6667M18.3332 10C18.3332 14.6024 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6024 1.6665 10C1.6665 5.39763 5.39746 1.66667 9.99984 1.66667C14.6022 1.66667 18.3332 5.39763 18.3332 10Z"
          stroke={stroke ?? 'black'}
          strokeWidth={strokeWidth ?? 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_54_1959">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ClockIcon;
