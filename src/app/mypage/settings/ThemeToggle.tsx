'use client';

import IconWrapper from '@/components/icons/IconWrapper';
import ThemeIcon from '@/components/icons/ui/ThemeIcon';
import { Switches } from '@/components/ui/common/toggles/Switch';
import { useThemeStore } from '@/store/useThemeStore';

import { css } from '@root/styled-system/css';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeStore();
  const checked = mode === 'light';

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: '12px',
        px: '20px',
        width: '100%',
        bg: 'white',
        borderRadius: 'md',
        boxShadow: 'sm',
        maxWidth: '100%',
        marginBottom: '20px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        })}
      >
        <IconWrapper size={22}>
          <ThemeIcon
            fill={
              checked ? 'var(--colors.gray-300)' : 'var(--colors.yellow-500)'
            }
          />
        </IconWrapper>

        <span
          className={css({
            fontSize: '16px',
            fontWeight: 400,
            color: 'text',
          })}
        >
          {checked ? '라이트 모드' : '다크 모드'}
        </span>
      </div>
      <Switches checked={checked} onChange={toggleTheme} />
    </div>
  );
}
