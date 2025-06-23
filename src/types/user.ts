// API 응답용 유저 타입
export interface ApiUser {
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

// 클라이언트 상태 관리용 유저 타입
export interface ClientUser {
  id: number;
  email: string;
  nickname: string;
  provider: 'google' | 'kakao';
  profile_image: string | null;
  is_paid_user: boolean;
}

// UI 렌더링용 유저 타입
export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  provider: 'google' | 'kakao';
}

export const apiUserToClientUser = (apiUser: ApiUser): ClientUser => ({
  id: apiUser.id,
  email: apiUser.email,
  nickname: apiUser.nickname || '사용자',
  provider: apiUser.provider,
  profile_image: apiUser.profileImage,
  is_paid_user: apiUser.isPaidUser,
});

export const clientUserToProfile = (user: ClientUser): UserProfile => ({
  id: user.id,
  email: user.email,
  nickname: user.nickname,
  profileImage: user.profile_image,
  provider: user.provider as 'google' | 'kakao',
});
