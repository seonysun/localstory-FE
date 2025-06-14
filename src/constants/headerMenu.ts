type HeaderMenu = {
  title: string;
  path: string;
}[];

export const NAVIGATE_MENU: HeaderMenu = [
  { title: '스토리', path: '/story' },
  { title: '구독', path: '/subscribe' },
  { title: '지도', path: '/map' },
  { title: '마이 페이지', path: '/' },
];
