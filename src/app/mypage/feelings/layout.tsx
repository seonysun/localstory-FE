import { mypageContainer } from '@/components/mypage/mypage.recipe';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title="내가 쓴 스토리" />
      <div className={mypageContainer()}>{children}</div>
    </>
  );
}
