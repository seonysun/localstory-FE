/* eslint-disable no-param-reassign */
import axios from 'axios';

const BASE_URL = 'https://localstorymap.com/api';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // 전역 상태 로직으로 변경
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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
