export type MenuItem = {
  title: string;
  path: string;
  onClick?: () => void;
};

export const NAVIGATE_MENU: MenuItem[] = [
  { title: '스토리', path: '/story' },
  { title: '구독', path: '/subscribe' },
  { title: '지도', path: '/map' },
];

export const AUTH_MENU = (
  isMobile: boolean,
  isLoggedIn: boolean,
  onLogout: () => void,
): MenuItem[] => {
  const login = { title: '로그인', path: '/login' };
  const logout = { title: '로그아웃', path: '/login', onClick: onLogout };

  if (isMobile) return [isLoggedIn ? logout : login];

  return isLoggedIn
    ? [...NAVIGATE_MENU, { title: '마이 페이지', path: '/mypage' }, logout]
    : [...NAVIGATE_MENU, login];
};
