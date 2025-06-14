import React from 'react';
import Link from 'next/link';
import FAQList from '@components/ui/faq/FAQList';

import {
  CheckIcon,
  ChevronRightIcon,
  ClockImageIcon,
} from '@/components/icons';
import { FAQ } from '@/constants/subscribe';

import { css } from '@root/styled-system/css';

const CARD_DESCRIPTION = [
  { icon: <CheckIcon />, text: '썸네일 미리보기' },
  { icon: <CheckIcon />, text: '북마크 기능' },
  { icon: <CheckIcon />, text: '알림 서비스' },
  { icon: <CheckIcon />, text: 'SNS 기능' },
];

function Page() {
  return (
    <section className={css({ mb: 24 })}>
      <article
        className={css({
          bg: 'yellow.500',
          textAlign: 'center',
        })}
      >
        <div className={css({ pt: 24 })}>
          <h1
            className={css({
              textStyle: 'body2',
              color: 'gray.600',
              mb: 6,
            })}
          >
            지금 구독료 인상 예정
          </h1>
          <h3
            className={css({
              textStyle: { base: 'headline3', md: 'headline2' },
              lineHeight: 1.5,
              mb: 8,
            })}
          >
            지금 구독하면, <br />
            인상 후에도 이 가격 그대로!
          </h3>
        </div>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <ClockImageIcon width={240} height={240} />
        </div>
      </article>
      <div className={css({ bg: 'gray.100' })}>
        <Link href="/payment" aria-label="플래너 정기구독 결제 페이지로 이동">
          <article
            className={css({
              bg: 'white',
              shadow: 'lg',
              borderRadius: 'lg',
              position: 'relative',
              width: '90%',
              mx: 'auto',
              p: 12,
              zIndex: 5,
              mt: '-6rem',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                mb: 4,
              })}
            >
              <h3 className={css({ textStyle: 'headline4' })}>
                플래너 정기구독
              </h3>
              <ChevronRightIcon className={css({ ml: 'auto' })} />
            </div>
            <div>
              <p className={css({ textStyle: 'body2', mb: 8 })}>
                수 많은 국내 여행지를 현지인들만 아는 로컬 명소를 <br />
                알아보세요!
              </p>
            </div>
            <ul>
              {CARD_DESCRIPTION.map((item, index) => (
                <li
                  key={`card-${item.text}-card-${index}`}
                  className={css({ display: 'flex', gap: 2, mb: 2 })}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </article>
        </Link>
        <article className={css({ p: 12 })}>
          <h1 className={css({ textStyle: 'headline4', mb: 2 })}>유의 사항</h1>
          <ul>
            {FAQ.map(item => (
              <FAQList key={item.id} text={item.text} />
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Page;
