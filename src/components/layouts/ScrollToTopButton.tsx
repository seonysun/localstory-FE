'use client';

import React, { useEffect, useState } from 'react';

import { css } from '@root/styled-system/css';

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <button
        type="button"
        aria-label="맨 위로 스크롤"
        className={css({
          position: 'fixed',
          p: 4,
          bg: 'black',
          color: 'white',
          borderRadius: 'full',
          zIndex: 10,
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          top: '82%',
          right: '4rem',
        })}
        onClick={scrollToTop}
      >
        Top
      </button>
    )
  );
}

export default ScrollToTopButton;
