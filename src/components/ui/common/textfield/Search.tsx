'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

import { SearchIcon } from '@/components/icons';

import { css, cx } from '@root/styled-system/css';

export type SearchVariant = 'default' | 'filled';

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  fullWidth?: boolean;
  variant?: SearchVariant;
}

/**
 * Search 컴포넌트
 * @section Form
 * @description 검색 전용 텍스트 입력 필드
 *
 * @example
 * // 기본 흰색 배경 스타일
 * <Search placeholder="Search" />
 *
 * // 회색 배경 스타일
 * <Search placeholder="어떤 곳이든" variant="filled" />
 */
export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ className, fullWidth = true, variant = 'default', ...props }, ref) => {
    const isDefault = variant === 'default';

    const wrapperStyle = css({
      display: 'flex',
      alignItems: 'center',
      bg: isDefault ? 'white' : 'gray.100',
      borderRadius: 'full',
      boxShadow: 'xs',
      px: 4,
      py: 3,
      w: fullWidth ? 'full' : 'auto',
      minH: '52px',
    });

    const iconStyle = css({
      w: '20px',
      h: '20px',
      color: isDefault ? 'gray.300' : 'gray.400',
      flexShrink: 0,
      mr: 3,
    });

    const inputStyle = css({
      border: 'none',
      outline: 'none',
      bg: 'transparent',
      flex: 1,
      textStyle: 'body2',
      color: 'textDefault',
      _placeholder: {
        color: isDefault ? 'gray.300' : 'gray.500',
      },
    });

    return (
      <div className={wrapperStyle}>
        <SearchIcon className={iconStyle} />
        <input ref={ref} className={cx(inputStyle, className)} {...props} />
      </div>
    );
  },
);

Search.displayName = 'Search';
