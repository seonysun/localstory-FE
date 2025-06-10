'use client';

import { ComponentProps, forwardRef } from 'react';

import { buttonStyle } from '@/components/ui/common/buttons/buttonStyle';
import type { Responsive } from '@/types/responsive';

import { cx } from '@root/styled-system/css';

type ButtonProps = Omit<ComponentProps<'button'>, 'type'> & {
  color?: 'primary' | 'black' | 'outline' | 'outlineSoft' | 'custom';
  size?: Responsive<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { color, size, radius, fullWidth, disabled, children, className, ...props },
    ref,
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        disabled={disabled}
        className={cx(
          buttonStyle({
            color,
            size: (typeof size === 'string' ? size : size?.base) as
              | 'xs'
              | 'sm'
              | 'md'
              | 'lg'
              | 'xl',
            radius,
            fullWidth,
            disabled,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
