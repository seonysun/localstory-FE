'use client';

import React, { useState } from 'react';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import { paymentOption } from '@api/options/paymentOption';
import Modal from '@components/ui/common/modals/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import SubscribeList from '@/app/mypage/subscribe/_components/SubscribeList';
import type { Subscribe } from '@/types/subscribeId.type';

import { css } from '@root/styled-system/css';

function Page() {
  const [subscribeId, setSubscribedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isError, isLoading } = useQuery<Subscribe[]>({
    queryKey: ['subscription'],
    queryFn: () => instance.get(ENDPOINTS.SUBSCRIBE.LIST).then(res => res.data),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...paymentOption.deleteSubscribes(),
    onSuccess: () => {
      alert('삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
    onError: () => {
      alert('삭제 실패');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <section className={css({ mt: 12 })}>
      <article>
        <h1 className={css({ textStyle: 'headline4', mb: 4 })}>구독 내역</h1>
        {isOpen && (
          <Modal
            title="구독 취소"
            content="구독을 정말 삭제하시겠습니까?"
            onConfirm={() => {
              if (subscribeId !== null) {
                mutation.mutate(String(subscribeId));
                setIsOpen(false);
              }
            }}
            onCancel={() => {
              setIsOpen(false);
            }}
          />
        )}
        <ul>
          {data && data.length > 0 ? (
            data?.map(result => (
              <SubscribeList
                key={result.impUid}
                subscribe={result}
                handlers={{ setIsOpen, setSubscribedId }}
              />
            ))
          ) : (
            <p>결제 내역이 없습니다.</p>
          )}
        </ul>
      </article>
    </section>
  );
}

export default Page;
