import React from 'react';
import Image from 'next/image';
import { chatBotDesc, chatBubble } from '@components/chatBot/chatBot.recipe';

import { css } from '@root/styled-system/css';

import { Message } from '@components/chatBot/types';

type Props = {
  image: string;
  messages: Message[];
};

function ChatMessageList({ messages, image }: Props) {
  return (
    <div>
      {messages.map(message => (
        <div
          key={`message-${message.type}-${message.content}`}
          className={css({
            display: 'flex',
            justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
            mb: '1rem',
          })}
        >
          {message.type === 'bot' && (
            <Image
              src={image}
              alt="챗봇 프로필"
              width={40}
              height={40}
              className={css({
                borderRadius: 'full',
                objectFit: 'cover',
                mr: '1rem',
              })}
            />
          )}
          <div className={chatBubble({ variant: message.type })}>
            <p>{message.content}</p>
            {message.desc && (
              <p className={chatBotDesc({ variant: message.type })}>
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
