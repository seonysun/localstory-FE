import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = 'https://localstorymap.com/api';

// 토큰 갱신 함수
export async function refreshAccessToken(): Promise<string | null> {
  const { refresh, setAuth, clearAuth, user } = useAuthStore.getState();

  if (!refresh) {
    clearAuth();
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/token/refresh/`, {
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

    // 새 토큰 저장 (기존 user 정보 유지)
    if (user && newAccess) {
      setAuth(user, newAccess, refresh);
      localStorage.setItem('access', newAccess);

      return newAccess;
    }

    throw new Error('No access token received');
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearAuth();
    return null;
  }
}

// API 요청 함수
export async function apiRequest(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const { access } = useAuthStore.getState();

  // 첫 번째 시도
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
    },
  });

  // 401 또는 403 에러시 토큰 갱신 시도
  if (response.status === 401 || response.status === 403) {
    const newAccess = await refreshAccessToken();

    if (newAccess) {
      // 새 토큰으로 재시도
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
