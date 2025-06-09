'use client';

import { useEffect, useState } from 'react';
import { HeartIcon } from '@components/icons';

import { css } from '@root/styled-system/css';

/**
 * 좋아요 토글 컴포넌트
 * @section Toggles
 * @description 좋아요 토글 컴포넌트
 * @usage 카드 등에서 사용
 *
 * @example
 * <Likes liked={false} onChange={(value) => console.log(value)} />
 */
export interface LikesProps {
  liked?: boolean;
  onChange?: (liked: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string;
}

export function Likes({
  liked = false,
  onChange,
  disabled = false,
  'aria-label': ariaLabel = '좋아요',
}: LikesProps) {
  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    onChange?.(newLiked);
  };

  return (
    <button
      type="button"
      aria-pressed={isLiked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleToggle}
      className={css({
        w: '36px',
        h: '36px',
        borderRadius: 'full',
        bg: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        outline: 'none',
        _hover: !disabled ? { boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.08)' } : {},
        _active: !disabled ? { transform: 'scale(0.95)' } : {},
        opacity: disabled ? 0.5 : 1,
      })}
    >
      <HeartIcon
        className={css({
          w: '20px',
          h: '20px',
          color: isLiked ? 'red.500' : 'gray.300',
          fill: isLiked ? 'red.500' : 'transparent',
          transition: 'all 0.2s ease-in-out',
        })}
      />
    </button>
  );
}
