'use client';

import { mypageContainer } from '@/components/mypage/mypage.recipe';
import MypageMenuList from '@/components/mypage/MypageMenuList';
import MypageProfile from '@/components/mypage/MypageProfile';
import MypageStats from '@/components/mypage/MypageStats';
import WithdrawalConfirmModal from '@/components/mypage/WithdrawalConfirmModal';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';
import { useModalStore } from '@/store/useModalStore';

export default function MypagePage() {
  const { isOpen } = useModalStore();

  return (
    <>
      <PageHeader title="마이페이지" />
      <div className={mypageContainer()}>
        <MypageProfile />
        <MypageStats />
        <MypageMenuList />
      </div>
      {isOpen && <WithdrawalConfirmModal />}
    </>
  );
}
