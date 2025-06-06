'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

import { SearchIcon } from '@/components/icons';

import { css, cx } from '@root/styled-system/css';

export type SearchVariant = 'default' | 'filled';
export type SearchSize = 'md';

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: SearchVariant;
  size?: SearchSize;
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * Search 컴포넌트
 * @section Form
 * @description 검색 전용 텍스트 입력 필드 (Input 기반)
 * @usage Map Search(default), TimeLine 검색(filled)
 *
 * @example
 * // Map Search - Default
 * <Search placeholder="Search" />
 *
 * // TimeLine - Filled
 * <Search placeholder="어떤 곳이든" variant="filled" />
 *
 * // 비활성화 상태
 * <Search placeholder="검색 중..." disabled />
 */
export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      radius = 'full',
      fullWidth = true,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const variantTokens = {
      default: {
        bg: 'white',
        iconColor: 'gray.300',
        placeholderColor: 'gray.300',
        shadow: 'xs',
      },
      filled: {
        bg: 'gray.100',
        iconColor: 'gray.400',
        placeholderColor: 'gray.500',
        shadow: 'xs',
      },
    } satisfies Record<SearchVariant, Record<string, string>>;

    const sizeTokens = {
      md: {
        px: '16px',
        py: '12px',
        textStyle: 'body2',
        minH: '52px',
      },
    } satisfies Record<SearchSize, Record<string, string>>;

    const token = {
      ...variantTokens[variant],
      ...sizeTokens[size],
    };

    const wrapperStyle = css({
      display: 'flex',
      alignItems: 'center',
      bg: token.bg,
      borderRadius: radius,
      boxShadow: token.shadow,
      px: 4,
      py: 3,
      w: fullWidth ? 'full' : 'auto',
      minH: token.minH,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
    });

    const iconStyle = css({
      w: '20px',
      h: '20px',
      color: token.iconColor,
      flexShrink: 0,
      mr: 3,
    });

    const inputStyle = css({
      border: 'none',
      outline: 'none',
      bg: 'transparent',
      flex: 1,
      color: 'textDefault',
      textStyle: token.textStyle,
      _placeholder: {
        color: token.placeholderColor,
      },
    });

    return (
      <div className={wrapperStyle}>
        <SearchIcon className={iconStyle} />
        <input
          ref={ref}
          className={cx(inputStyle, className)}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  },
);

Search.displayName = 'Search';
