'use client';

import React, { useCallback, useState } from 'react';
import {
  chatBotPanel,
  chatBotWrapper,
} from '@components/chatBot/chatBot.recipe';
import ChatBotMessage from '@components/chatBot/ChatBotMessage';

import { ChatBotIcon } from '@/components/icons';

import { css } from '@root/styled-system/css';

function ChatBotModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsModalOpen(prev => !prev), []);

  return (
    <section className={css({ position: 'relative' })}>
      <article className={chatBotWrapper()}>
        {!isModalOpen && (
          <button
            type="button"
            onClick={openModal}
            aria-label="대화 시작하기"
            className={css({
              bg: 'black',
              borderRadius: 'full',
              p: '2',
              cursor: 'pointer',
            })}
          >
            <ChatBotIcon width={40} height={40} />
          </button>
        )}
        {isModalOpen && (
          <div className={chatBotPanel()}>
            <ChatBotMessage openModal={openModal} />
          </div>
        )}
      </article>
    </section>
  );
}

export default ChatBotModal;
