import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgMenu = ({
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
      stroke={stroke ?? '#242424'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth ?? 3}
      d="M3.5 14h21m-21-7h21m-21 14h21"
    />
  </svg>
);
export default SvgMenu;
