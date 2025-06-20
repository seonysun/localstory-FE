import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher } from '@/api/fetcher';

interface SocialLoginResponse {
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
): Promise<SocialLoginResponse> => {
  return mutationFetcher<SocialLoginResponse>('post', ENDPOINTS.USERS.KAKAO, {
    code,
  });
};

export const postGoogleLoginCode = (
  code: string,
): Promise<SocialLoginResponse> => {
  return mutationFetcher<SocialLoginResponse>('post', ENDPOINTS.USERS.GOOGLE, {
    code,
  });
};
