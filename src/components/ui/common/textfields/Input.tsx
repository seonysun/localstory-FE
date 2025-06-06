'use client';

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react';

import { css, cx } from '@root/styled-system/css';

export type InputSize = 'sm' | 'md';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullWidth?: boolean;
  endIcon?: ReactNode;
  disabled?: boolean;
}

/**
 * Input 컴포넌트
 * @section Form
 * @description 기본 텍스트 입력 필드 컴포넌트
 * @usage Profile Edit, 지역 선택, 이름 입력 등
 *
 * @example
 * // 기본 입력 필드
 * <Input placeholder="이름을 입력하세요" />
 *
 * // 인증된 상태 (지역 선택)
 * <Input
 *   value="부산광역시"
 *   readOnly
 *   endIcon={<CheckIcon className="w-5 h-5 text-blue-500" />}
 * />
 *
 * // 비활성화 상태
 * <Input placeholder="로딩 중..." disabled />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      radius = 'lg',
      fullWidth = true,
      disabled = false,
      endIcon,
      className,
      ...props
    },
    ref,
  ) => {
    const controlId = useId();

    const sizeTokens = {
      sm: {
        px: '16px',
        py: '10px',
        textStyle: 'body3',
        height: '44px',
      },
      md: {
        px: '20px',
        py: '12px',
        textStyle: 'body2',
        height: '52px',
      },
    } satisfies Record<InputSize, Record<string, string>>;

    const token = sizeTokens[size];

    const wrapperStyles = css({
      display: 'flex',
      alignItems: 'center',
      bg: 'gray.50',
      borderRadius: radius,
      boxShadow: 'xs',
      w: fullWidth ? 'full' : 'auto',
      h: token.height,
      px: token.px,
      opacity: disabled ? 0.5 : 1,
    });

    const inputStyles = css({
      flex: 1,
      border: 'none',
      outline: 'none',
      bg: 'transparent',
      textStyle: token.textStyle,
      color: 'textDefault',
      cursor: disabled ? 'not-allowed' : 'text',
      _placeholder: {
        color: 'gray.500',
      },
    });

    return (
      <div className={wrapperStyles}>
        <input
          id={controlId}
          ref={ref}
          className={cx(inputStyles, className)}
          disabled={disabled}
          {...props}
        />
        {endIcon && (
          <div className={css({ ml: 2, flexShrink: 0 })}>{endIcon}</div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
