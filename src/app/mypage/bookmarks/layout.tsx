import { mypageContainer } from '@/components/mypage/mypage.recipe';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title="북마크" />
      <div className={mypageContainer()}>{children}</div>
    </>
  );
}
