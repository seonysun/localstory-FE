import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgLocation = ({
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
    viewBox="0 0 15 14"
  >
    <path
      fill={fill ?? '#707070'}
      stroke={stroke ?? '#707070'}
      strokeWidth={strokeWidth ?? 1.1}
      d="M12.645 6.352c0 2.864-3.271 6.481-5.234 6.481S2.176 9.216 2.176 6.352 4.52 1.167 7.411 1.167c2.89 0 5.234 2.321 5.234 5.185Z"
    />
    <ellipse
      cx={7.411}
      cy={6.417}
      fill="#FFFFFF"
      stroke={stroke ?? '#707070'}
      strokeWidth={strokeWidth ?? 1.1}
      rx={1.745}
      ry={1.75}
    />
  </svg>
);
export default SvgLocation;
