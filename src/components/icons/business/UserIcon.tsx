import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgCustomer = ({
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
    viewBox="0 0 24 24"
    fill={fill}
  >
    <circle cx="12" cy="8" r="4" fill="currentColor" />
    <path
      d="M4 20c0-3.31 3.13-6 8-6s8 2.69 8 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
export default SvgCustomer;
