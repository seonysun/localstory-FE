'use client';

import { forwardRef, type TextareaHTMLAttributes, useId } from 'react';

import { css, cx } from '@root/styled-system/css';

export type TextareaSize = 'sm' | 'md';
export type TextareaVariant = 'default' | 'large';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize;
  variant?: TextareaVariant;
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullWidth?: boolean;
}

/**
 * Textarea 컴포넌트
 * @section Form
 * @description 다중 라인 텍스트 입력 필드
 *
 * @example
 * // 기본 사용법
 * <Textarea placeholder="메시지를 입력하세요" />
 *
 * // 작은 크기
 * <Textarea size="sm" placeholder="간단한 메모" />
 *
 * // 큰 버전 (특별 스타일)
 * <Textarea variant="large" placeholder="자세한 후기를 작성하세요" />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      variant = 'default',
      radius = 'lg',
      fullWidth = true,
      className,
      ...props
    },
    ref,
  ) => {
    const controlId = useId();

    const sizeTokens = {
      sm: {
        px: '16px',
        py: '12px',
        minH: '100px',
        textStyle: 'body3',
      },
      md: {
        px: '20px',
        py: '16px',
        minH: variant === 'large' ? '200px' : '140px',
        textStyle: variant === 'large' ? 'label2' : 'body2',
      },
    } satisfies Record<TextareaSize, Record<string, string>>;

    const token = sizeTokens[size];

    const baseStyles = css({
      w: fullWidth ? 'full' : 'auto',
      display: 'block',
      resize: 'none',
      bg: variant === 'large' ? 'white' : 'gray.50',
      color: 'textDefault',
      border: 'none',
      borderRadius: radius,
      outline: 'none',
      boxShadow: variant === 'large' ? 'md' : 'xs',
      transition: 'all 0.2s ease',
      _placeholder: {
        color: variant === 'large' ? 'gray.200' : 'gray.500',
      },
      textStyle: token.textStyle,
      px: token.px,
      py: token.py,
      minHeight: token.minH,
    });

    return (
      <textarea
        id={controlId}
        ref={ref}
        className={cx(baseStyles, className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
