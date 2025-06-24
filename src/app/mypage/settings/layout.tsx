import { mypageContainer } from '@/components/mypage/mypage.recipe';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title="설정" />
      <div className={mypageContainer()}>{children}</div>
    </>
  );
}
