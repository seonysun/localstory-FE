'use client';

import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { chatBotOptions } from '@api/options/chatBotOption';
import ChatBotHeader from '@components/chatBot/ChatBotHeader';
import ChatBotIntro from '@components/chatBot/ChatBotIntro';
import ChatMessageList from '@components/chatBot/ChatMessageList';
import { Button } from '@components/ui/common/buttons/Button';
import { Textarea } from '@components/ui/common/textfields';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { css } from '@root/styled-system/css';

import { APIMessage, Message } from '@components/chatBot/types';

type Props = {
  openModal: () => void;
};

function ChatBotMessage({ openModal }: Props) {
  const [chatbotMeta] = useState({
    title: '일로일로 챗봇🤖',
    image: '/images/story1.png',
    desc: '여행이 궁금할 땐 언제든지 물어보세요! 요약은 지도 상세 글에서만 가능해요! 요약이라고 입력해주세요!',
  });
  const params = useParams();
  const markerId = params.id;
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
    onError: () => {
      toast.error('메시지 전송에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const summarizeMutation = useMutation({
    ...chatBotOptions.postSummarize(),
    onSuccess: (data, variables) => {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: variables.raw_text },
        {
          role: 'assistant',
          content: (data.summary || data[0]?.summary) ?? '요약 결과 없음',
        },
      ]);
    },
    onError: () => {
      toast.error('요약에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const onSummarize = () => {
    if (!value.trim()) return;
    summarizeMutation.mutate({
      marker_id: Number(markerId),
      raw_text: value.trim(),
    });
    setValue('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    try {
      const findMessage: APIMessage[] = [
        { role: 'assistant', content: '너는 여행 AI야' },
        ...messages.map(
          (m): APIMessage => ({
            role: m.role === 'assistant' ? 'user' : m.role,
            content: m.content,
          }),
        ),
      ];
      mutation.mutate({
        messages: [...findMessage, { role: 'user', content: value.trim() }],
        userMessage: value.trim(),
      });
      setValue('');
    } catch (e) {
      toast.error('메시지 전송에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (mutation.isError) return <div>Error...</div>;

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
        <ChatMessageList
          messages={messages}
          image={chatbotMeta.image}
          isPending={mutation.isPending}
        />
        {summarizeMutation.isPending && (
          <div
            className={css({
              mt: 4,
              mb: 2,
              color: 'gray.500',
              fontSize: 15,
              textAlign: 'center',
            })}
          >
            잠시만 기다려주세요...
          </div>
        )}
      </div>
      <form ref={formRef} onSubmit={onSubmit}>
        <Textarea
          value={value}
          rows={1}
          onKeyDown={handleKeyDown}
          onChange={onChange}
          placeholder="메시지를 입력하세요..."
        />
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            mt: 2,
          })}
        >
          <Button type="submit" size="sm" color="primary" aria-label="전송하기">
            전송
          </Button>
          <Button
            type="button"
            onClick={onSummarize}
            size="sm"
            color="primary"
            aria-label="요약하기"
          >
            요약하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatBotMessage;
