'use client';

import { useEffect } from 'react';

export default function ConsoleArt() {
  useEffect(() => {
    /* eslint-disable no-irregular-whitespace */
    console.info(`
┌──────────────────────────────┐
│  일로일로 부산 로컬 여행!   │
└──────────────────────────────┘
      ／＞　 フ
     | 　_　_| 
   ／\` ミ＿xノ 
  /　　　　 |
 /　 ヽ　　 ﾉ
│　　|　|　|
／￣|　　 |　|
(￣ヽ＿_ヽ_)__)
＼二つ

~ 부산 바다에서 귀여운 고양이와 함께 여행해요! ~
`);
  }, []);
  return null;
}
