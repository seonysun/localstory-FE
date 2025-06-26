'use client';

import React, { useState } from 'react';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import { paymentOption } from '@api/options/paymentOption';
import Modal from '@components/ui/common/modals/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import PaymentList from '@/app/mypage/payment-history/_components/PaymentList';
import type { Payment } from '@/types/payment.types';

import { css } from '@root/styled-system/css';

type Result = {
  results: Payment[];
};

function MypagePaymentHistory() {
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<Result>({
    queryKey: ['paymentHistory'],
    queryFn: () => instance.get(ENDPOINTS.PAYMENT.LIST).then(res => res.data),
  });

  const paymentLength = data?.results.length ?? 0;
  const mutation = useMutation({
    ...paymentOption.deletePayments(),
    onSuccess: () => {
      toast.success('결제 내역 삭제에 성공했습니다!');
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
    onError: () => {
      toast.error('결제 내역 삭제에 실패했습니다!');
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <section className={css({ mt: 4, mb: 24 })}>
      <article>
        <h1 className={css({ textStyle: 'headline4', mb: 4 })}>
          전체 내역{' '}
          {paymentLength > 0 ? (
            <span className={css({ textStyle: 'body1' })}>
              ({paymentLength}개)
            </span>
          ) : (
            ''
          )}
        </h1>
        {isOpen && (
          <Modal
            title="결제 내역 삭제"
            content="정말 삭제하시겠습니까?"
            onConfirm={() => {
              if (paymentId !== null) {
                mutation.mutate(paymentId);
                setIsOpen(false);
              }
            }}
            onCancel={() => {
              setIsOpen(false);
            }}
          />
        )}
        <ul>
          {data && paymentLength > 0 ? (
            data?.results.map(result => (
              <PaymentList
                key={result.id}
                payment={result}
                handlers={{ setIsOpen, setPaymentId }}
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

export default MypagePaymentHistory;
