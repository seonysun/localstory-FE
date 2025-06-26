'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CloseIcon, LogoIcon, MenuIcon } from '@components/icons';
import {
  dimOverlay,
  headerWrapper,
  navMenu,
  navWrapper,
} from '@components/layouts/header.recipe';
import { toast } from 'sonner';

import { AUTH_MENU, MenuItem, NAVIGATE_MENU } from '@/constants/headerMenu';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAuthStore } from '@/store/useAuthStore';

const Header = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = !!user;

  const handleLogout = () => {
    clearAuth();
    toast.success('로그아웃 되었습니다.');
    router.push('/login');
  };

  const handleToggleMenu = () => setIsMenuOpen(prev => !prev);
  const handleCloseMenu = () => {
    if (isMobile) setIsMenuOpen(false);
  };

  const authMenu = AUTH_MENU(isMobile, isLoggedIn, handleLogout);

  return (
    <>
      <header className="pt_4" style={{ zIndex: 1000, position: 'relative' }}>
        <nav className={navWrapper()}>
          <div className={headerWrapper()}>
            <Link href="/" className="d_flex ai_center">
              <LogoIcon width={150} color="black" />
            </Link>

            <div className="d_flex ai_center gap_4 md:gap_6">
              {isMobile ? (
                <>
                  {authMenu.map((menu: MenuItem) => (
                    <Link
                      key={menu.title}
                      href={menu.path}
                      onClick={() => {
                        menu.onClick?.();
                        handleCloseMenu();
                      }}
                    >
                      {menu.title}
                    </Link>
                  ))}
                  <button
                    type="button"
                    aria-label="메뉴 열기 또는 닫기"
                    className="d_block md:d_none cursor_pointer"
                    onClick={handleToggleMenu}
                    style={{ zIndex: 1001 }}
                  >
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  </button>
                </>
              ) : (
                <>
                  {authMenu.map((menu: MenuItem) => (
                    <Link
                      key={menu.title}
                      href={menu.path}
                      onClick={menu.onClick}
                    >
                      {menu.title}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* 모바일 드롭다운 메뉴 */}
          {isMobile && (
            <ul className={navMenu({ isOpen: isMenuOpen })}>
              {[
                ...NAVIGATE_MENU,
                ...(isLoggedIn
                  ? [{ title: '마이페이지', path: '/mypage' }]
                  : []),
              ].map(menu => (
                <li
                  key={menu.path}
                  className="d_flex ai_center hover:td_underline"
                >
                  <Link
                    className="d_block w_100%"
                    href={menu.path}
                    onClick={handleCloseMenu}
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>

      {isMenuOpen && isMobile && (
        <div className={dimOverlay()} onClick={handleCloseMenu} />
      )}
    </>
  );
};

export default Header;
