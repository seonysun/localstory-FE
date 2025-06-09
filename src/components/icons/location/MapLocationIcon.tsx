import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgMapLocation = ({
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
    viewBox="0 0 24 24"
  >
    <g transform="translate(0, -1)">
      <path
        fill={stroke ?? '#08080A'}
        d="M18.75 9.75q-.07-2.86-1.98-4.77Q14.858 3.072 12 3q-2.859.07-4.77 1.98-1.909 1.911-1.98 4.77 0 2.085 1.675 4.77Q8.601 17.202 12 20.46q3.398-3.257 5.075-5.94 1.675-2.685 1.675-4.77M12 22.5Q3.75 15 3.75 9.75q.093-3.516 2.414-5.836Q8.484 1.594 12 1.5q3.516.094 5.836 2.414T20.25 9.75Q20.25 15 12 22.5m0-12a1.5 1.5 0 0 0 1.055-.445q.42-.422.422-1.055 0-.632-.422-1.054A1.43 1.43 0 0 0 12 7.523q-.632 0-1.055.423A1.43 1.43 0 0 0 10.523 9q.001.633.422 1.055.422.422 1.055.445m0 1.5q-1.266-.023-2.121-.879Q9.024 10.266 9 9q.023-1.266.879-2.121Q10.734 6.024 12 6q1.266.024 2.121.879T15 9q-.023 1.266-.879 2.121-.855.855-2.121.879m8.11 4.5 2.39 6h-6.75V21h-7.5v1.5H1.5l2.392-6zm-1.618 0H5.507L3.726 21h16.547z"
      />
    </g>
  </svg>
);
export default SvgMapLocation;
