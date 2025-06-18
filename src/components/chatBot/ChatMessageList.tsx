import React from 'react';
import Image from 'next/image';
import { chatBotDesc, chatBubble } from '@components/chatBot/chatBot.recipe';

import { css } from '@root/styled-system/css';

import { Message } from '@components/chatBot/types';

type Props = {
  image: string;
  messages: Message[];
  isPending: boolean;
};

function ChatMessageList({ messages, image, isPending }: Props) {
  const combinedMessages = isPending
    ? [
        ...messages,
        { role: 'assistant' as const, content: '잠시만 기다려주세요...' },
      ]
    : messages;

  return (
    <div>
      {combinedMessages.map((message, idx) => (
        <div
          key={`message-${idx}`}
          className={css({
            display: 'flex',
            justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
            mb: '1rem',
          })}
        >
          {message.role === 'assistant' && (
            <div
              className={css({
                width: '40px',
                height: '40px',
                flexShrink: 0,
                borderRadius: 'full',
                overflow: 'hidden',
                mr: '1rem',
              })}
            >
              <Image
                src={image}
                alt="챗봇 프로필"
                width={40}
                height={40}
                className={css({
                  borderRadius: 'full',
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  mr: '1rem',
                })}
              />
            </div>
          )}
          <div className={chatBubble({ variant: message.role })}>
            <p>{message.content}</p>
            {message.desc && (
              <p className={chatBotDesc({ variant: message.role })}>
                {message.desc}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessageList;
