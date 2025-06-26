'use client';

import React, { useState } from 'react';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import { paymentOption } from '@api/options/paymentOption';
import Modal from '@components/ui/common/modals/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
      toast.success('삭제에 성공했습니다!');
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
    onError: () => {
      toast.error('삭제에 실패했습니다. 다시 시도해 주세요.');
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
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
        <ul
          className={css({ display: 'flex', flexDirection: 'column', gap: 4 })}
        >
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
