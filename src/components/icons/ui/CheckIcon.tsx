import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgVector2531 = ({
  width = 24,
  height = 24,
  fill = 'none',
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
    viewBox="0 0 13 9"
  >
    <path
      stroke={stroke ?? '#0D6EFD'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth ?? 1.5}
      d="M1.463 5.053 4.9 8l7.308-7"
    />
  </svg>
);
export default SvgVector2531;
