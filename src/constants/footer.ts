type FooterContactItem = {
  label: string;
  value: string;
  text: string;
}[];

type FooterMenu = {
  title: string;
  path: string;
}[];

const FIGMA_LINK: string = 'https://www.figma.com/file/JSccwQkynWD8Eyzr9HRJ8I';
const GITHUB_URL: string = 'https://github.com/orgs/LocalStoryMap/repositories';

export const FOOTER_CONTACT: FooterContactItem = [
  { label: 'Figma', value: FIGMA_LINK, text: '피그마 바로가기' },
  { label: 'Info', value: GITHUB_URL, text: '깃허브 바로가기' },
];

export const FOOTER_MENU: FooterMenu = [
  { title: '이용약관', path: '/' },
  { title: '개인정보처리방침', path: '/' },
  { title: '제휴/광고 문의', path: '/' },
  { title: '소셜/등록/제작 문의', path: '/' },
];
