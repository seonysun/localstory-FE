'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { withdrawUser } from '@/app/api/user/userApi';
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';
import Modal from '@/components/ui/common/modals/Modal';
import { useAuthStore } from '@/store/useAuthStore';
import { useModalStore } from '@/store/useModalStore';

import { css } from '@root/styled-system/css';

function WithdrawalConfirmModal() {
  const router = useRouter();
  const { close } = useModalStore();
  const { clearAuth, refresh } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const shakeClass = css({ animation: 'shake 0.5s' });

  const handleWithdraw = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!refresh) throw new Error('로그인 정보가 없습니다.');
      await withdrawUser(refresh);
      clearAuth();
      close();
      router.replace('/');
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error
          ? e.message
          : '회원 탈퇴에 실패했습니다. 다시 시도해주세요.';
      setError(errorMessage);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
    setShake(false);
  };

  if (loading) {
    return (
      <Modal
        content={<SpinnerMessage message="회원 탈퇴 처리 중..." />}
        type="one"
      />
    );
  }

  return (
    <Modal
      title={error ? '탈퇴 처리 실패' : '정말 탈퇴하시겠어요?'}
      content={
        error ? (
          <span>{error}</span>
        ) : (
          <>
            탈퇴 시 모든 정보가 삭제되며,
            <br />
            복구는 불가능합니다.
          </>
        )
      }
      type={error ? 'one' : 'two'}
      onConfirm={error ? handleCloseError : handleWithdraw}
      className={shake ? shakeClass : ''}
    />
  );
}

export default WithdrawalConfirmModal;
