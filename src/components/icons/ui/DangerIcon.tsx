import React from 'react';
import { IconProps } from '@components/icons/iconProps';

function DangerIcon({
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
      viewBox="0 0 45 44"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.061 0C34.2113 0 44.061 9.84974 44.061 22C44.061 34.1503 34.2113 44 22.061 44C9.91077 44 0.0610352 34.1503 0.0610352 22C0.0610352 9.84974 9.91077 0 22.061 0ZM22.0669 29.5547C20.2388 29.5547 18.7408 31.0147 18.7661 32.8174C18.7407 34.6455 20.2388 36.1181 22.0669 36.1182C23.8062 36.1182 25.3423 34.6455 25.3677 32.8174C25.3423 31.0147 23.8061 29.5547 22.0669 29.5547ZM19.4517 27.79H24.6694L25.2534 9.75H18.8677L19.4517 27.79Z"
        fill={fill}
      />
    </svg>
  );
}

export default DangerIcon;
