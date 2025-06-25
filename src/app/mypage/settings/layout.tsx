import { mypageContainer } from '@/components/mypage/mypage.recipe';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

import { css } from '@root/styled-system/css';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css({ mt: 8 })}>
      <PageHeader title="설정" />
      <div className={mypageContainer()}>{children}</div>
    </div>
  );
}
