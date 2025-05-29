import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgLogOut = ({
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
    viewBox="0 0 24 24"
  >
    <path
      stroke={stroke ?? '#7D848D'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth ?? 1.5}
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5m0 0-5-5m5 5H9"
    />
  </svg>
);
export default SvgLogOut;
