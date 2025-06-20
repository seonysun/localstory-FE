import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgJourney = ({
  width = 24,
  height = 24,
  fill = 'none',
  stroke = '#7D848D',
  strokeWidth,
  ...props
}: IconProps) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 26 20"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.93779 11.5701L7.96155 9.12505L9.41229 8.67205C9.67558 8.59005 9.96465 8.62805 10.1925 8.77505L11.4519 9.58405L14.4813 8.34305L11.3165 4.61205L13.8935 4.10205L18.0555 7.13505L22.4937 5.48905C23.5802 5.08605 24.7795 5.76005 24.9009 6.84205V6.84205C24.9826 7.56005 24.5495 8.24405 23.8338 8.52605L15.8783 11.6601C15.6741 11.7401 15.4571 11.7841 15.2357 11.7891L10.6642 11.8951C10.3795 11.9041 10.1087 11.7821 9.93779 11.5701Z"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.7243 5.80002C20.1714 2.96102 17.0099 1.01202 13.3529 1.01202C8.16249 1.01202 3.95532 4.92902 3.95532 9.76202C3.95532 14.594 8.16249 18.512 13.3529 18.512C18.5434 18.512 22.7505 14.595 22.7505 9.76202C22.7505 9.50102 22.7323 9.24502 22.7086 8.99002"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.97685 10.349C1.97375 11.716 0.889451 13.233 1.37303 14.293C2.05864 15.873 5.9273 15.908 10.0141 14.371"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgJourney;
