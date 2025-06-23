import { ENDPOINTS } from '@/api/endpoints';
import { BASE_URL } from '@/api/instance';
import { apiRequest } from '@/api/interceptor';

export interface User {
  id: number;
  email: string;
  nickname: string | null;
  provider: 'google' | 'kakao';
  socialId: string | null;
  profileImage: string | null;
  isPaidUser: boolean;
  dateJoined: string;
  lastLogin: string | null;
}

// GET - 유저 정보 조회
export const getUserInfo = async (): Promise<User> => {
  const response = await apiRequest(`${BASE_URL}${ENDPOINTS.USERS.ME}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
};

// PATCH - 닉네임만 수정
export const updateUserNickname = async (nickname: string): Promise<User> => {
  const formData = new FormData();
  formData.append('nickname', nickname);

  const response = await apiRequest(`${BASE_URL}${ENDPOINTS.USERS.ME}`, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update nickname');
  }

  return response.json();
};

// PATCH - 프로필 이미지만 수정
export const updateUserProfileImage = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('profile_image', file);

  const response = await apiRequest(`${BASE_URL}${ENDPOINTS.USERS.ME}`, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    console.error('Profile image update response:', response);
    throw new Error('Failed to update profile image');
  }

  return response.json();
};
