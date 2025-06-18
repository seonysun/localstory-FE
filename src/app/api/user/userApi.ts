import { ENDPOINTS } from '@/api/endpoints';
import { useAuthStore } from '@/store/useAuthStore';

export interface User {
  id: number;
  email: string;
  nickname: string | null;
  provider: 'google' | 'kakao';
  social_id: string | null;
  profile_image: string | null;
  is_paid_user: boolean;
  date_joined: string;
  last_login: string | null;
}

const API_BASE_URL = 'https://localstorymap.com/api';

// 토큰 갱신 함수
async function refreshAccessToken(): Promise<string | null> {
  const { refresh, setAuth, clearAuth, user } = useAuthStore.getState();

  if (!refresh) {
    clearAuth();
    window.location.href = '/login';
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    const newAccess = data.access;

    if (user && newAccess) {
      setAuth(user, newAccess, refresh);
      localStorage.setItem('access', newAccess);
      return newAccess;
    }

    throw new Error('No access token received');
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearAuth();
    localStorage.clear();
    window.location.href = '/login';
    return null;
  }
}

// API 요청 함수
async function apiRequest(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const { access } = useAuthStore.getState();

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    const newAccess = await refreshAccessToken();

    if (newAccess) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccess}`,
        },
      });
    }
  }

  return response;
}

// GET - 유저 정보 조회
export const getUserInfo = async (): Promise<User> => {
  const response = await apiRequest(`${API_BASE_URL}${ENDPOINTS.USERS.ME}`, {
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

  const response = await apiRequest(`${API_BASE_URL}${ENDPOINTS.USERS.ME}`, {
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

  const response = await apiRequest(`${API_BASE_URL}${ENDPOINTS.USERS.ME}`, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    console.error('Profile image update response:', response);
    throw new Error('Failed to update profile image');
  }

  return response.json();
};
