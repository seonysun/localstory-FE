import React from 'react';
import { IconProps } from '@components/icons/iconProps';

function BackIcon({
  width = 24,
  height = 24,
  fill = 'currentColor',
  stroke,
  strokeWidth,
  ...props
}: IconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4008 6.41425C15.7233 6.67301 15.7756 7.14498 15.5176 7.46843L11.9025 11.9999L15.5176 16.5314C15.7756 16.8548 15.7233 17.3268 15.4008 17.5856C15.0782 17.8443 14.6076 17.7919 14.3495 17.4684L10.3606 12.4684C10.1421 12.1945 10.1421 11.8053 10.3606 11.5314L14.3495 6.53138C14.6076 6.20794 15.0782 6.1555 15.4008 6.41425Z"
        fill={fill}
      />
    </svg>
  );
}

export default BackIcon;
