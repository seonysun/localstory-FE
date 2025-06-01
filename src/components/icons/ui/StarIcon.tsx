import React from 'react';
import { IconProps } from '@components/icons/iconProps';

function StarIcon({
  width = 24,
  height = 24,
  fill = 'currentColor',
  stroke,
  strokeWidth,
  ...props
}: IconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.705 1.189L8.269 5.946L1.38 6.926C0.494 7.053 0.174 8.196 0.948 8.923L5.388 13.118L4.189 20.204C4.056 21.021 4.942 21.632 5.681 21.256L12 18.018L18.319 21.256C19.058 21.63 19.944 21.021 19.811 20.204L18.612 13.118L23.052 8.923C23.826 8.196 23.506 7.053 22.62 6.926L15.731 5.946L13.295 1.189C12.89 0.402 11.11 0.397 10.705 1.189Z"
        fill={fill}
      />
    </svg>
  );
}

export default StarIcon;
