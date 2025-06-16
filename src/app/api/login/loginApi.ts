import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher } from '@/api/fetcher';

interface KakaoLoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    provider: string;
    social_id: string;
    profile_image?: string;
    is_paid_user?: boolean;
    date_joined: string;
    last_login?: string;
  };
}

export const postKakaoLoginCode = (
  code: string,
): Promise<KakaoLoginResponse> => {
  return mutationFetcher<KakaoLoginResponse>('post', ENDPOINTS.USERS.KAKAO, {
    code,
  });
};
