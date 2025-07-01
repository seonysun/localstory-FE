import { useCallback, useEffect, useState } from 'react';

import {
  getUserInfo,
  updateUserNickname as updateNickname,
  updateUserProfileImage,
} from '@/api/options/userApi';
import { useAuthStore } from '@/store/useAuthStore';
import {
  apiUserToClientUser,
  type ClientUser,
  clientUserToProfile,
  type UserProfile,
} from '@/types/user';

export const useUserProfile = () => {
  const { user, setAuth, access, refresh } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 유저 프로필 정보 조회
  const fetchUserProfile = useCallback(async () => {
    if (!user || !access) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userInfo = await getUserInfo();
      const clientUser = apiUserToClientUser(userInfo);
      const newProfile = clientUserToProfile(clientUser);

      setProfile(newProfile);
      setAuth(clientUser, access, refresh || '');
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setError('프로필 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [user, access, refresh, setAuth]);

  // 초기 렌더링 시 유저 프로필 정보 조회 및 동기화
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user && access) {
      fetchUserProfile();
    }
  }, []);

  // 닉네임 업데이트
  const updateUserNickname = useCallback(
    async (nickname: string): Promise<void> => {
      if (!profile || !user || !access || !refresh) {
        throw new Error('프로필 정보가 없습니다.');
      }

      try {
        const updatedUser = await updateNickname(nickname);

        const updatedClientUser: ClientUser = {
          ...user,
          nickname: updatedUser.nickname || nickname,
        };

        const newProfile = clientUserToProfile(updatedClientUser);
        setProfile(newProfile);
        setAuth(updatedClientUser, access, refresh || '');
        localStorage.setItem('user', JSON.stringify(updatedClientUser));
      } catch (err) {
        console.error('Failed to update nickname:', err);
        throw new Error('닉네임 변경에 실패했습니다.');
      }
    },
    [profile, user, access, refresh, setAuth],
  );

  // 프로필 이미지 업데이트
  const updateProfileImage = useCallback(
    async (file: File): Promise<string> => {
      if (!profile || !user || !access || !refresh) {
        throw new Error('프로필 정보가 없습니다.');
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        throw new Error('이미지 파일만 업로드 가능합니다. (JPG, PNG, GIF)');
      }

      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('파일 크기는 2MB 이하여야 합니다.');
      }

      try {
        const updatedUser = await updateUserProfileImage(file);
        const updatedClientUser: ClientUser = {
          ...user,
          profile_image: updatedUser.profileImage || null,
        };

        const newProfile = clientUserToProfile(updatedClientUser);
        setProfile(newProfile);
        setAuth(updatedClientUser, access, refresh || '');
        localStorage.setItem('user', JSON.stringify(updatedClientUser));

        return updatedUser.profileImage || '';
      } catch (err) {
        console.error('Failed to upload profile image:', err);
        throw new Error('프로필 사진 업로드에 실패했습니다.');
      }
    },
    [profile, user, access, refresh, setAuth],
  );

  return {
    profile,
    loading,
    error,
    updateUserNickname,
    updateProfileImage,
    refetch: fetchUserProfile,
  };
};
