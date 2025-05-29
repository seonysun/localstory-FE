import React from 'react';
import { IconProps } from '@components/icons/iconProps';

function PenIcon({
  width = 24,
  height = 24,
  fill = 'none',
  stroke,
  strokeWidth,
  ...props
}: IconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 19H18.9501M11.7545 3.31171C11.7545 3.31171 11.7545 4.94634 13.3846 6.58096C15.0147 8.21559 16.6448 8.21559 16.6448 8.21559M5.30766 15.9881L8.73086 15.4977C9.22465 15.4269 9.68224 15.1975 10.0349 14.8438L18.2749 6.58096C19.1752 5.67818 19.1752 4.21449 18.2749 3.31171L16.6448 1.67708C15.7446 0.774305 14.2849 0.774305 13.3846 1.67708L5.14465 9.93996C4.79195 10.2936 4.56315 10.7525 4.49261 11.2477L4.00358 14.6804C3.89491 15.4432 4.54695 16.097 5.30766 15.9881Z"
        stroke="#0D6EFD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default PenIcon;
