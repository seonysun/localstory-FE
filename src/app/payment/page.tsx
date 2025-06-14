import React from 'react';
import { KakaoIcon, TossIcon } from '@components/icons';
import { Button } from '@components/ui/common/buttons/Button';
import FAQList from '@components/ui/faq/FAQList';

import { FAQ } from '@/constants/subscribe';

import { css } from '@root/styled-system/css';

function Page() {
  return (
    <section>
      <article className={css({ bg: '#1b1b1b', p: 8 })}>
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
          <p>이용기간 : 2025.05.27 ~ 2025.06.27(1개월)</p>
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
          {/* 이 쪽을 포트원과 연결해주세요 */}
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 4,
            })}
          >
            <Button aria-label="토스로 결제하기">
              <TossIcon />
              토스 결제
            </Button>
            <Button
              aria-label="카카오로 결제하기"
              color="custom"
              className={css({ bg: 'yellow.500' })}
            >
              <KakaoIcon />
              카카오 결제
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
  );
}

export default Page;
