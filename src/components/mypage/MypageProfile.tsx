'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PenIcon } from '@/components/icons';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuthStore } from '@/store/useAuthStore';

import {
  avatarBox,
  avatarImage,
  avatarWrapper,
  editButton,
  email,
  hiddenFileInput,
  nickname,
  nicknameInput,
  nicknameWrapper,
  profileInfo,
  profileSection,
  providerBadge,
} from './mypage.recipe';

export default function MypageProfile() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { profile, updateUserNickname, updateProfileImage, loading, refetch } =
    useUserProfile();

  const [profileImageUrl, setProfileImageUrl] = useState(
    '/images/default-userImage.png',
  );
  const [nicknameValue, setNicknameValue] = useState('');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (profile?.nickname) {
      setNicknameValue(profile.nickname);
    } else if (user?.nickname) {
      setNicknameValue(user.nickname);
    }
  }, [profile?.nickname, user?.nickname]);

  useEffect(() => {
    const validProfileImage = profile?.profileImage?.trim();
    const validUserImage = user?.profile_image?.trim();

    if (validProfileImage) {
      setProfileImageUrl(`${validProfileImage}?t=${Date.now()}`);
    } else if (validUserImage) {
      setProfileImageUrl(validUserImage);
    } else {
      setProfileImageUrl('/images/default-userImage.png');
    }
  }, [profile?.profileImage, user?.profile_image]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUpdating(true);

        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          alert('파일 크기는 2MB 이하여야 합니다.');
          return;
        }

        const newImageUrl = await updateProfileImage(file);
        await refetch();
        setProfileImageUrl(`${newImageUrl}?t=${Date.now()}`);
      } catch (error) {
        console.error('프로필 이미지 업로드 실패:', error);
        alert(
          error instanceof Error
            ? error.message
            : '프로필 이미지 업로드에 실패했습니다.',
        );
      } finally {
        setIsUpdating(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleNicknameEdit = async () => {
    if (isEditingNickname) {
      if (nicknameValue && nicknameValue !== profile?.nickname) {
        try {
          setIsUpdating(true);
          await updateUserNickname(nicknameValue);
          await refetch();
        } catch (error) {
          console.error('닉네임 변경 실패:', error);
          alert('닉네임 변경에 실패했습니다.');
          setNicknameValue(profile?.nickname || user?.nickname || '');
        } finally {
          setIsUpdating(false);
        }
      }
      setIsEditingNickname(false);
    } else {
      setIsEditingNickname(true);
      setTimeout(() => {
        nicknameInputRef.current?.focus();
      }, 0);
    }
  };

  const handleNicknameBlur = () => {
    handleNicknameEdit();
  };

  if (!user) return <div className={profileSection()} />;

  const displayEmail = profile?.email || user.email;
  const displayProvider = profile?.provider || user.provider;

  return (
    <div className={profileSection()}>
      <div className={avatarWrapper()}>
        <button
          type="button"
          className={avatarBox()}
          onClick={handleImageClick}
          aria-label="프로필 사진 변경"
          disabled={isUpdating}
        >
          <Image
            src={profileImageUrl}
            alt="profile"
            width={96}
            height={96}
            className={avatarImage()}
            onError={() => setProfileImageUrl('/images/default-userImage.png')}
            unoptimized
          />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={hiddenFileInput()}
          aria-hidden="true"
          disabled={isUpdating}
        />
      </div>

      <div className={profileInfo()}>
        <div className={nicknameWrapper()}>
          {isEditingNickname ? (
            <input
              ref={nicknameInputRef}
              type="text"
              value={nicknameValue}
              onChange={e => setNicknameValue(e.target.value)}
              onBlur={handleNicknameBlur}
              onKeyPress={e => {
                if (e.key === 'Enter') handleNicknameEdit();
              }}
              className={nicknameInput()}
              disabled={isUpdating}
            />
          ) : (
            <span className={nickname()}>{nicknameValue}</span>
          )}
          <button
            type="button"
            className={editButton()}
            aria-label="닉네임 편집"
            onClick={handleNicknameEdit}
            disabled={isUpdating}
          >
            <PenIcon size={14} color="#7D848D" />
          </button>
        </div>
        <div className={email()}>
          {displayEmail}
          <span
            className={providerBadge({
              provider: displayProvider as 'kakao' | 'google',
            })}
          >
            {displayProvider === 'google' ? 'G' : 'K'}
          </span>
        </div>
      </div>
    </div>
  );
}
