import React from 'react';

import type { IconProps } from '@/components/icons/iconProps';

import { css } from '@root/styled-system/css';

interface IconWrapperProps {
  children: React.ReactElement<IconProps>;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  colorMode?: 'auto' | 'fill' | 'stroke' | 'both';
  style?: React.CSSProperties;
}

export default function IconWrapper({
  children,
  size = 24,
  color = 'currentColor',
  strokeWidth,
  className,
  colorMode = 'auto',
  style,
}: IconWrapperProps) {
  const getColorProps = () => {
    switch (colorMode) {
      case 'fill':
        return { fill: color };
      case 'stroke':
        return { stroke: color, fill: 'none' };
      case 'both':
        return { fill: color, stroke: color };
      case 'auto':
      default:
        return { color };
    }
  };

  const wrapperStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });

  const combinedClassName = className
    ? `${wrapperStyles} ${className}`
    : wrapperStyles;

  const clonedIcon = React.cloneElement(children, {
    width: size,
    height: size,
    ...getColorProps(),
    ...(strokeWidth && { strokeWidth }),
    style: { width: `${size}px`, height: `${size}px` },
  });

  return (
    <span className={combinedClassName} style={style}>
      {clonedIcon}
    </span>
  );
}
