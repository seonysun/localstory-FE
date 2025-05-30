import React from 'react';
import { IconProps } from '@components/icons/iconProps';

function CloseIcon({
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
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CloseIcon;
