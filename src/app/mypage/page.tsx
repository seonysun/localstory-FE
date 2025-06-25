'use client';

import { useCallback, useState } from 'react';

import { mypageContainer } from '@/components/mypage/mypage.recipe';
import MypageMenuList from '@/components/mypage/MypageMenuList';
import MypageProfile from '@/components/mypage/MypageProfile';
import MypageStats from '@/components/mypage/MypageStats';
import WithdrawalConfirmModal from '@/components/mypage/WithdrawalConfirmModal';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

export default function MypagePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <>
      <PageHeader title="마이페이지" />
      <div className={mypageContainer()}>
        <MypageProfile />
        <MypageStats />
        <MypageMenuList onOpen={onOpen} />
      </div>
      {isOpen && <WithdrawalConfirmModal onClose={onClose} />}
    </>
  );
}
