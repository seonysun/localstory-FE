/* eslint-disable no-param-reassign */
import axios from 'axios';

import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = 'https://localstorymap.com/api';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export const setAuthHeader = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

instance.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token =
        useAuthStore.getState().access || localStorage.getItem('access');
      if (!config.headers.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

if (typeof window !== 'undefined') {
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        // 토큰 재발급 or 로그아웃 로직 추가
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );
}
