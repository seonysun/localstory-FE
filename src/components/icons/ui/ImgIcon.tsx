import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgPicture = ({
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
    <rect width="24" height="24" rx="4" fill="currentColor" />
    <path
      d="M6 16l4-4 3 3 5-5"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="8" r="1.5" fill="#fff" />
  </svg>
);
export default SvgPicture;
