import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgCoffeeCup = ({
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
      fill={stroke ?? '#08080A'}
      fillOpacity={strokeWidth ?? 0.96}
      d="M18 4.5a4.45 4.45 0 0 1 3.938 2.31q.609 1.089.574 2.284a4.56 4.56 0 0 1-.68 2.263 4.34 4.34 0 0 1-1.71 1.629q-1.065.562-2.309.515-.563 2.018-2.144 3.246-1.582 1.23-3.668 1.255H7.5q-2.554-.07-4.242-1.758-1.687-1.689-1.758-4.242v-8.25a.73.73 0 0 1 .21-.54.73.73 0 0 1 .54-.21h15a.73.73 0 0 1 .539.21q.21.21.21.54v.75zM18 6v6q1.266-.023 2.121-.879T21 9q-.023-1.266-.879-2.121Q19.266 6.024 18 6M2.25 19.5h15a.73.73 0 0 1 .54.21q.21.212.21.54a.73.73 0 0 1-.21.54.73.73 0 0 1-.54.21h-15a.73.73 0 0 1-.54-.21.73.73 0 0 1-.21-.54.73.73 0 0 1 .21-.54.73.73 0 0 1 .54-.21M3 4.5V12q.047 1.922 1.313 3.188Q5.578 16.452 7.5 16.5H12q1.922-.048 3.188-1.312Q16.452 13.922 16.5 12V4.5z"
    />
  </svg>
);
export default SvgCoffeeCup;
