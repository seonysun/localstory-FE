'use client';

import React from 'react';
import Image from 'next/image';
import { scrollSectionInner } from '@components/home/recipes/HomeSection.recipe';
import {
  scrollMainText,
  scrollSubText,
} from '@components/home/recipes/text.recipe';
import { useScrollReveal } from '@components/home/useScrollReveal';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { css } from '@root/styled-system/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

function SearchStorySection() {
  const swiperCard = [
    '/images/story1.png',
    '/images/story2.png',
    '/images/story3.png',
  ];
  const { ref, isVisible } = useScrollReveal();

  return (
    <article
      className={css({
        textAlign: 'center',
        marginBottom: '3rem',
        marginTop: '3rem',
      })}
    >
      <div ref={ref} className={scrollSectionInner({ visible: isVisible })}>
        <h1 className={scrollMainText()}>검색 기능 ・ 스토리</h1>
        <h2 className={scrollSubText()}>
          함께 만들어 가요 <br />
          우리들의 스토리를
        </h2>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <Swiper
            spaceBetween={10}
            slidesPerView={1.2}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            navigation={false}
          >
            {swiperCard.map(image => (
              <SwiperSlide key={`swiper-slide-${image}`}>
                <Image
                  src={image}
                  alt="story"
                  width={500}
                  height={675}
                  className={css({
                    objectFit: 'cover',
                    width: '100%',
                    height: '500px',
                    borderRadius: 'sm',
                  })}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </article>
  );
}

export default SearchStorySection;
