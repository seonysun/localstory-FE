'use client';

import { forwardRef, type TextareaHTMLAttributes, useId } from 'react';

import { css, cx } from '@root/styled-system/css';

export type TextareaSize = 'md' | 'lg';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize;
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * Textarea 컴포넌트
 * @section Form
 * @description 다중 라인 텍스트 입력 필드
 * @usage Profile Edit(md), TimeLine Story 작성(lg)
 *
 * @example
 * // Profile Edit - 자기소개 작성
 * <Textarea placeholder="자기소개를 입력하세요" />
 *
 * // TimeLine Story - 후기 작성
 * <Textarea size="lg" placeholder="직접 다녀온 생생한 후기를 작성해보세요" />
 *
 * // 비활성화 상태
 * <Textarea placeholder="제출 중..." disabled />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      radius = 'lg',
      fullWidth = true,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const controlId = useId();

    const sizeTokens = {
      md: {
        px: '20px',
        py: '16px',
        minH: '140px',
        textStyle: 'body2',
      },
      lg: {
        px: '20px',
        py: '16px',
        minH: '200px',
        textStyle: 'label2',
      },
    } satisfies Record<TextareaSize, Record<string, string>>;

    const token = sizeTokens[size];

    const backgroundColor = size === 'lg' ? 'white' : 'gray.50';
    const shadowValue = size === 'lg' ? 'md' : 'xs';
    const placeholderColor = size === 'lg' ? 'gray.200' : 'gray.500';

    const baseStyles = css({
      w: fullWidth ? 'full' : 'auto',
      display: 'block',
      resize: 'none',
      bg: backgroundColor,
      color: 'textDefault',
      border: 'none',
      borderRadius: radius,
      outline: 'none',
      boxShadow: shadowValue,
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
      _placeholder: {
        color: placeholderColor,
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
        disabled={disabled}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
