import React from 'react';
import Image from 'next/image';

import { css } from '@root/styled-system/css';

type Props = {
  image: string;
};
// 초기 메시지 (하드코딩, 렌더링만 담당)
const INITIAL_MESSAGES = [
  {
    type: 'bot',
    content: '안녕하세요! 일로일로 챗봇입니다.',
    desc: '여행이 궁금할 땐 언제든지 물어보세요!',
  },
];

function ChatBotIntro({ image }: Props) {
  return (
    <div>
      {INITIAL_MESSAGES.map(item => (
        <div
          key={`iniaial-${item.type}-${item.content}`}
          className={css({
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            mb: '1rem',
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
            })}
          />
          <div
            className={css({
              bg: 'gray.100',
              p: '1rem',
              borderRadius: '1rem',
              maxWidth: '80%',
            })}
          >
            <p className={css({ fontWeight: 'bold', mb: '0.5rem' })}>
              {item.content}
            </p>
            <p className={css({ color: 'gray.600', fontSize: '0.9rem' })}>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatBotIntro;
