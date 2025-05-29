import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgVersion = ({
  width = 24,
  height = 24,
  fill = 'none',
  stroke,
  strokeWidth,
  ...props
}: IconProps) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 26 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.6866 11.5C21.6866 6.805 17.5977 3 12.5523 3C7.50692 3 3.41797 6.805 3.41797 11.5C3.41797 16.195 7.50692 20 12.5523 20"
      stroke="#7D848D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.9021 19.27L22.7612 21"
      stroke="#7D848D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.8997 15.7322C21.9489 16.7085 21.9489 18.2914 20.8997 19.2677C19.8506 20.244 18.1495 20.244 17.1004 19.2677C16.0512 18.2914 16.0512 16.7085 17.1004 15.7322C18.1495 14.7559 19.8506 14.7559 20.8997 15.7322"
      stroke="#7D848D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.37122 15.281H4.43354C7.47796 15.281 9.50793 15.119 9.50793 12.448C9.50793 9.615 12.5524 9.615 12.5524 7.726C12.5524 5.614 8.49241 5.837 8.49241 3.948V3.88"
      stroke="#7D848D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.6866 11.5H18.3896C16.1276 11.5 14.9272 9.01302 16.4295 7.43902L18.6121 5.15302"
      stroke="#7D848D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgVersion;
