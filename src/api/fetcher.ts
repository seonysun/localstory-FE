import { instance } from '@/api/instance';

export async function ssrFetcher<T = any>(url: string): Promise<T | null> {
  try {
    const res = await instance.get<T>(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.warn('SSR 환경에서 인증 에러');
      return null;
    }
    throw error;
  }
}

export function queryFetcher<T = any>(
  url: string,
  params?: Record<string, any>,
): () => Promise<T> {
  return async () => {
    const res = await instance.get<T>(url, { params });
    return res.data;
  };
}

export function mutationFetcher<T = any>(
  method: 'post' | 'put' | 'patch' | 'delete',
  url: string,
  payload?: any,
): Promise<T> {
  return instance
    .request<T>({ method, url, data: payload })
    .then(res => res.data);
}
