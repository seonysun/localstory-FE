'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { paymentOption } from '@api/options/paymentOption';
import { TossIcon } from '@components/icons';
import { Button } from '@components/ui/common/buttons/Button';
import Modal from '@components/ui/common/modals/Modal';
import FAQList from '@components/ui/faq/FAQList';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { formatDotDate } from '@util/date';
import { toast } from 'sonner';

import { getUserInfo } from '@/api/options/userApi';
import { FAQ } from '@/constants/subscribe';
import { IamportResponse } from '@/types/iamport';
import { apiUserToClientUser } from '@/types/user';

import { css } from '@root/styled-system/css';

const SUBSCRIPTION_PERIOD_MONTHS = 1;
function PaymentSection() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { user, updateUser } = useAuthStore();
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + SUBSCRIPTION_PERIOD_MONTHS);

  const router = useRouter();
  const name = user?.nickname;
  const email = user?.email;

  const mutation = useMutation({
    ...paymentOption.postSubscribes(),
    onSuccess: async () => {
      try {
        const apiUser = await getUserInfo();
        const clientUser = apiUserToClientUser(apiUser);
        updateUser(clientUser);
        toast.success('구독 생성에 성공했습니다.');
      } catch (e) {
        toast.error('유저 정보 갱신에 실패했습니다.');
      }
    },
    onError: () => {
      toast.error('구독 생성에 실패했습니다. 고객센터에 문의해주세요.');
    },
  });

  const handlePayment = () => {
    if (!window.IMP) {
      toast.error('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    const { IMP } = window;
    if (typeof IMP.close === 'function') {
      IMP.close();
    }
    IMP?.init(process.env.NEXT_PUBLIC_IAMPORT_ID!);

    const paymentData = {
      pg: 'uplus',
      pay_method: 'card',
      merchant_uid: `payment-${crypto.randomUUID()}`,
      amount: 4000,
      name: '일로일로 구독 결제',
      buyer_name: name ?? '구매자',
      buyer_email: email ?? 'no-email@example.com',
    };
    IMP.request_pay(paymentData, callback);
  };

  function callback(response: IamportResponse) {
    const { success } = response;

    if (success) {
      if (!response?.imp_uid) {
        toast.error('결제 정보가 올바르지 않습니다.');
        return;
      }
      mutation.mutate({
        imp_uid: response.imp_uid,
        merchant_uid: response?.merchant_uid ?? '',
      });
      setModalOpen(true);
    } else {
      toast.error('에러가 발생했습니다.');
    }
  }
  return (
    <>
      <section>
        <article className={css({ bg: '#1b1b1b', p: 8, mt: 12 })}>
          <h1
            className={css({
              textStyle: 'headline3',
              color: 'white',
            })}
          >
            상품 구매
          </h1>
          <div className={css({ borderBottom: '1px solid #484848', mt: 8 })} />
          <div
            className={css({
              mt: 8,
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            })}
          >
            <h4>Planner</h4>
            <p>스토리 + 여행 상세 정보</p>
            <p>
              이용기간 : {formatDotDate(startDate)} ~ {formatDotDate(endDate)}
              (1개월)
            </p>
            <p>금액 (매월) : 4,000원</p>
          </div>
          <div className={css({ borderBottom: '1px solid #484848', mt: 8 })} />
          <div>
            <h4
              className={css({
                textStyle: 'headline3',
                mt: 6,
                mb: 6,
                color: 'white',
              })}
            >
              결제수단 선택
            </h4>
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 4,
              })}
            >
              <Button
                aria-label="토스로 결제하기"
                onClick={() => handlePayment()}
                className={css({
                  display: 'flex',
                  gap: 4,
                  alignItems: 'center',
                })}
              >
                <TossIcon />
                토스 페이먼츠 결제
              </Button>
            </div>
          </div>
        </article>
        <article className={css({ bg: 'gray.50', p: 8, minHeight: '30vh' })}>
          <h1 className={css({ textStyle: 'headline4', mb: 4 })}>유의 사항</h1>
          <ul
            className={css({
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 4,
            })}
          >
            {FAQ.map(item => (
              <FAQList key={item.id} text={item.text} />
            ))}
          </ul>
        </article>
      </section>
      {modalOpen && (
        <Modal
          title="결제 성공"
          content="결제가 성공적으로 완료되었습니다."
          type="one"
          onConfirm={() => {
            setModalOpen(false);
            router.push('/');
          }}
        />
      )}
    </>
  );
}

export default PaymentSection;
