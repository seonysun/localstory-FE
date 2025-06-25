import React from 'react';
import { CheckIcon, CloseIcon, LogoIcon } from '@components/icons';
import { Button } from '@components/ui/common/buttons/Button';
import { formatDotDate } from '@util/date';

import type { Subscribe } from '@/types/subscribeId.type';

import { css } from '@root/styled-system/css';

type Props = {
  subscribe: Subscribe;
  handlers: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSubscribedId: React.Dispatch<React.SetStateAction<number | null>>;
  };
};

function SubscribeList({ subscribe, handlers }: Props) {
  const { startAt, userEmail, subscribeId, merchantUid, expiresAt } = subscribe;
  const { setIsOpen, setSubscribedId } = handlers;

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
          <h1>: 일로일로 구독내역</h1>
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
                setSubscribedId(subscribeId);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
        <p>
          {formatDotDate(startAt)} ~ {formatDotDate(expiresAt)}
        </p>
        <p>이메일 : {userEmail}</p>
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

export default SubscribeList;
