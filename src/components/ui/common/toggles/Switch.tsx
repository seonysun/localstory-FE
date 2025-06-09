'use client';

import { useEffect, useState } from 'react';

import { css } from '@root/styled-system/css';

/**
 * 스위치 토글 컴포넌트
 * @section Toggles
 * @description On/Off 상태를 시각적으로 표현하는 스위치 컴포넌트
 * @usage 게시글 공개 여부, 라이트 모드 등 설정에서 사용
 *
 * @example
 * <Switches checked={true} onChange={(value) => console.log(value)} />
 */
export interface SwitchesProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string;
}

export function Switches({
  checked = false,
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
}: SwitchesProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    const newState = !isChecked;
    setIsChecked(newState);
    onChange?.(newState);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleToggle}
      className={css({
        position: 'relative',
        w: '36px',
        h: '20px',
        bg: isChecked ? 'blue.600' : 'gray.200',
        borderRadius: 'full',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        outline: 'none',
        opacity: disabled ? 0.5 : 1,
        _hover: !disabled
          ? { boxShadow: '0 0 0 2px rgba(23, 70, 255, 0.15)' }
          : {},
      })}
    >
      <div
        className={css({
          position: 'absolute',
          top: '2px',
          left: isChecked ? '18px' : '2px',
          w: '16px',
          h: '16px',
          bg: 'white',
          borderRadius: 'full',
          transition: 'all 0.2s ease-in-out',
          boxShadow: 'sm',
        })}
      />
    </button>
  );
}
