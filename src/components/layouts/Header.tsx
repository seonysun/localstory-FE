'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CloseIcon, LogoIcon, MenuIcon } from '@components/icons';
import {
  dimOverlay,
  headerWrapper,
  navMenu,
  navWrapper,
} from '@components/layouts/header.recipe';

import { NAVIGATE_MENU } from '@/constants/headerMenu';

import { css } from '@root/styled-system/css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  const onClose = () => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={css({ paddingTop: '4' })}>
      {isMenuOpen && <div className={dimOverlay()} onClick={onClick} />}
      <nav className={navWrapper()}>
        <div className={headerWrapper()}>
          <Link href="/" onClick={onClose} passHref>
            <LogoIcon width={150} color="black" />
          </Link>
          <ul className={navMenu({ isOpen: isMenuOpen })}>
            {NAVIGATE_MENU.map(menu => (
              <li
                key={menu.title}
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  _hover: { textDecoration: 'underline' },
                })}
              >
                <Link
                  href={menu.path}
                  className={css({ display: 'block', width: '100%' })}
                  onClick={onClose}
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onClick}
            aria-label="메뉴 열기 또는 닫기"
            className={css({
              display: {
                base: 'block',
                md: 'none',
              },
              cursor: 'pointer',
              marginLeft: '4',
            })}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
