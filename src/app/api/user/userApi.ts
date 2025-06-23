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
    throw new Error('Failed to update profile image');
  }

  return response.json();
};

export const withdrawUser = async (refresh: string): Promise<boolean> => {
  const response = await apiRequest(`${BASE_URL}${ENDPOINTS.USERS.WITHDRAW}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  });

  if (response.status !== 204) {
    throw new Error('회원 탈퇴 실패');
  }
  return true;
};
