'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { paymentOption } from '@api/options/paymentOption';
import { TossIcon } from '@components/icons';
import { Button } from '@components/ui/common/buttons/Button';
import FAQList from '@components/ui/faq/FAQList';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { formatDotDate } from '@util/date';

import Modal from '@/components/ui/common/modals/Modal';
import { FAQ } from '@/constants/subscribe';
import { IamportResponse } from '@/types/iamport';

import { css } from '@root/styled-system/css';

function Page() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { user } = useAuthStore();
  const date = new Date();
  const month = date.getMonth();
  date.setMonth(month + 1);

  const router = useRouter();
  const name = user?.nickname;
  const email = user?.email;

  const mutation = useMutation({
    ...paymentOption.postSubscribes(),
    onError: error => {
      alert('구독 생성에 실패했습니다. 고객센터에 문의해주세요.');
    },
  });

  const handlePayment = () => {
    if (!window.IMP) {
      alert('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
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
    const { success, error_msg } = response;

    if (success) {
      if (!response?.imp_uid) {
        alert('결제 정보가 올바르지 않습니다.');
        return;
      }
      console.log(response?.buyer_name);
      mutation.mutate({
        imp_uid: response.imp_uid,
        merchant_uid: response?.merchant_uid ?? '',
      });
      setModalOpen(true);
    } else {
      console.error(error_msg);
      alert(`결제 실패: ${error_msg || '알 수 없는 오류'}`);
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
            {/* 여기를 날짜를 받아서 변경해주세요. 아니면 현재 날짜로 1달 계산해서 */}
            <p>
              이용기간 : {formatDotDate(new Date())} ~ {formatDotDate(date)}{' '}
              (1개월)
            </p>
            <p>금액 (매월) :4,000원</p>
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
            {/* 이 쪽을 포트원과 연결해주세요 */}
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

export default Page;
