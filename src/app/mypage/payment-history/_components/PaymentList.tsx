import React from 'react';
import { CheckIcon, CloseIcon, LogoIcon } from '@components/icons';
import { Button } from '@components/ui/common/buttons/Button';
import { formatDotDate } from '@util/date';

import type { Payment } from '@/types/payment.types';

import { css } from '@root/styled-system/css';

type Props = {
  payment: Payment;
  handlers: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPaymentId: React.Dispatch<React.SetStateAction<number | null>>;
  };
};

function PaymentList({ payment, handlers }: Props) {
  const { createdAt, cardName, id, merchantUid } = payment;
  const { setIsOpen, setPaymentId } = handlers;
  const date = new Date();
  const month = date.getMonth();
  date.setMonth(month + 1);
  return (
    <li
      className={css({
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 4,
        border: '1px solid #c9c9c9',
        borderRadius: 'sm',
        p: 4,
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          })}
        >
          <LogoIcon width={80} height={40} />
          <h1>: 일로일로 결제내역</h1>
          <div
            className={css({
              display: 'flex',
              ml: 'auto',
              alignItems: 'center',
            })}
          >
            <Button
              size="sm"
              color="outlineSoft"
              type="button"
              aria-label="결제 내역 삭제"
              onClick={() => {
                setIsOpen(true);
                setPaymentId(id);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
        <p>
          {formatDotDate(createdAt)} ~ {formatDotDate(date)}
        </p>
        <p>카드 : {cardName}</p>
        <p>금액 : 4,000원</p>
        <p>주문 번호 : {merchantUid}</p>
      </div>
      <div
        className={css({
          width: '100%',
          borderBottom: '1px solid #c9c9c9',
        })}
      />
      <div
        className={css({
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        })}
      >
        <CheckIcon />
        결제 완료
      </div>
    </li>
  );
}

export default PaymentList;
