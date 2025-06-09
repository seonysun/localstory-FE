'use client';

import React, { useState } from 'react';
import { chatInputWrapper } from '@components/chatBot/chatBot.recipe';
import ChatBotHeader from '@components/chatBot/ChatBotHeader';
import ChatBotIntro from '@components/chatBot/ChatBotIntro';
import ChatMessageList from '@components/chatBot/ChatMessageList';
import { Button } from '@components/ui/common/buttons/Button';
import { Input } from '@components/ui/common/textfields';

import { css } from '@root/styled-system/css';

import { Message } from '@components/chatBot/types';

type Props = {
  openModal: () => void;
};

function ChatBotMessage({ openModal }: Props) {
  const [chatbotMeta] = useState({
    title: '일로일로 챗봇 🤖',
    image: '/images/story1.png',
    desc: '여행이 궁금할 땐 언제든지 물어보세요!',
  });
  const [value, setValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    // Todo: 추후 서버 연결시 서버에서 가져오는 데이터 answer으로 교체
    try {
      const mockData = { answer: '안녕하세요' };
      setMessages(prev => [
        ...prev,
        { type: 'user', content: mockData.answer },
        { type: 'bot', content: value },
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      setValue('');
    }
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bg: 'white',
      })}
    >
      <ChatBotHeader openModal={openModal} />
      <div
        className={css({
          flex: 1,
          overflowY: 'auto',
          p: '1rem',
        })}
      >
        {/* 초기 메시지 표시 */}
        <ChatBotIntro image={chatbotMeta.image} />
        {/* 대화 메시지 표시 */}
        <ChatMessageList messages={messages} image={chatbotMeta.image} />
      </div>
      <form onSubmit={onSubmit} className={chatInputWrapper()}>
        <Input
          value={value}
          onChange={onChange}
          placeholder="메시지를 입력하세요..."
        />
        <Button
          type="submit"
          size="md"
          color="primary"
          aria-label="전송하기"
          className={css({
            width: 'auto',
            px: '1.5rem',
          })}
        >
          전송
        </Button>
      </form>
    </div>
  );
}

export default ChatBotMessage;
