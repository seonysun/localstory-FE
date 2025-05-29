import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgMenu1 = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  stroke,
  strokeWidth,
  ...props
}: IconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 28 28"
  >
    <path
      fill={fill}
      d="M14.285 17.41a1.42 1.42 0 1 1 0 2.84 1.42 1.42 0 0 1 0-2.84m0-5.683a1.42 1.42 0 1 1-.002 2.842 1.42 1.42 0 0 1 .002-2.842m0-5.682a1.42 1.42 0 1 1-.002 2.842 1.42 1.42 0 0 1 .002-2.842"
    />
  </svg>
);
export default SvgMenu1;
