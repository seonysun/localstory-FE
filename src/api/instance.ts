/* eslint-disable no-param-reassign */
import axios from 'axios';

import { refreshAccessToken } from '@/api/interceptor';
import { useAuthStore } from '@/store/useAuthStore';

export const BASE_URL = 'https://localstorymap.com/api';

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

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = undefined;
};

if (typeof window !== 'undefined') {
  instance.interceptors.request.use(
    config => {
      const token =
        useAuthStore.getState().access || localStorage.getItem('access');
      if (!config.headers.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 ||
        (error.response?.status === 403 && !originalRequest._retry)
      ) {
        originalRequest._retry = true;

        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          setAuthHeader(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }

        clearAuthHeader();
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );
}
