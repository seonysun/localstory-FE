import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgComments = ({
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
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke ?? '#000'}
    strokeWidth={strokeWidth ?? 1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
export default SvgComments;
