import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgGroup6898 = ({
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
    viewBox="0 0 20 20"
  >
    <circle
      cx={9.806}
      cy={9.806}
      r={7.49}
      stroke={stroke ?? '#484848'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth ?? 1.5}
    />
    <path
      stroke={stroke ?? '#484848'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth ?? 1.5}
      d="m15.015 15.404 2.937 2.93"
    />
  </svg>
);
export default SvgGroup6898;
