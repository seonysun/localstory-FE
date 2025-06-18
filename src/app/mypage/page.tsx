import { mypageContainer } from '@/components/mypage/mypage.recipe';
import MypageMenuList from '@/components/mypage/MypageMenuList';
import MypageProfile from '@/components/mypage/MypageProfile';
import MypageStats from '@/components/mypage/MypageStats';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

export default function MypagePage() {
  return (
    <>
      <PageHeader title="마이페이지" />
      <div className={mypageContainer()}>
        <MypageProfile />
        <MypageStats />
        <MypageMenuList />
      </div>
    </>
  );
}
