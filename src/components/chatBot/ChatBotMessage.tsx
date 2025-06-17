'use client';

import React, { useRef, useState } from 'react';
import { chatBotOptions } from '@api/options/chatBotOption';
import { chatInputWrapper } from '@components/chatBot/chatBot.recipe';
import ChatBotHeader from '@components/chatBot/ChatBotHeader';
import ChatBotIntro from '@components/chatBot/ChatBotIntro';
import ChatMessageList from '@components/chatBot/ChatMessageList';
import { Button } from '@components/ui/common/buttons/Button';
import { Textarea } from '@components/ui/common/textfields';
import { useMutation } from '@tanstack/react-query';

import { css } from '@root/styled-system/css';

import { APIMessage, Message } from '@components/chatBot/types';

type Props = {
  openModal: () => void;
};

function ChatBotMessage({ openModal }: Props) {
  const [chatbotMeta] = useState({
    title: '일로일로 챗봇 🤖',
    image: '/images/story1.png',
    desc: '여행이 궁금할 땐 언제든지 물어보세요!',
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const [value, setValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const sendMessage = () => {
    formRef.current?.requestSubmit();
  };

  const mutation = useMutation({
    ...chatBotOptions.postChatBot(),
    onSuccess: (data, variables) => {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: variables.userMessage },
        { role: 'assistant', content: data.reply },
      ]);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    try {
      const findMessage: APIMessage[] = [
        { role: 'system', content: '너는 여행 AI야' },
        ...messages.map(
          (m): APIMessage => ({
            role: m.role === 'assistant' ? 'user' : m.role,
            content: m.content,
          }),
        ),
      ];
      mutation.mutate({
        findMessage,
        userMessage: value.trim(),
      });
      setValue('');
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        maxWidth: '393px',
        bg: 'white',
      })}
    >
      <ChatBotHeader openModal={openModal} />
      <div
        className={css({
          flex: 1,
          overflowY: 'auto',
          p: { base: '0.75rem', md: '1rem' },
          pb: { base: '4rem', md: '1rem' },
        })}
      >
        {/* 초기 메시지 표시 */}
        <ChatBotIntro image={chatbotMeta.image} />
        {/* 대화 메시지 표시 */}
        <ChatMessageList messages={messages} image={chatbotMeta.image} />
      </div>
      <form ref={formRef} onSubmit={onSubmit} className={chatInputWrapper()}>
        <Textarea
          value={value}
          rows={1}
          onKeyDown={handleKeyDown}
          onChange={onChange}
          placeholder="메시지를 입력하세요..."
          className={css({
            flex: 1,
            resize: 'none',
            minHeight: '40px',
            maxHeight: '200px',
            overflowY: 'auto',
          })}
        />
        <Button
          type="submit"
          size="md"
          color="primary"
          aria-label="전송하기"
          className={css({
            width: 'auto',
            px: { base: '1rem', md: '1.5rem' },
            flexShrink: 0,
          })}
        >
          전송
        </Button>
      </form>
    </div>
  );
}

export default ChatBotMessage;
