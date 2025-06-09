import React from 'react';
import { LogoIcon, LogoutIcon } from '@components/icons';
import { Button } from '@components/ui/common/buttons/Button';

import { css } from '@root/styled-system/css';

type Props = {
  openModal: () => void;
};

function ChatBotHeader({ openModal }: Props) {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        bg: 'blue.400',
        py: '1rem',
        px: '1.5rem',
        color: 'white',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        })}
      >
        <LogoIcon width={80} />
        <p className={css({ fontSize: '1.2rem', fontWeight: 'bold' })}>
          Ai 챗봇 문의
        </p>
      </div>
      <Button
        type="button"
        size="sm"
        color="outline"
        aria-label="닫기"
        onClick={openModal}
        className={css({
          width: 'auto',
        })}
      >
        <LogoutIcon />
      </Button>
    </div>
  );
}

export default ChatBotHeader;
