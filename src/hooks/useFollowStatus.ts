import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import { useQuery } from '@tanstack/react-query';

export type FollowItem = {
  id: number;
  follow: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
  createdAt: string;
};

export const useFollowStatus = (targetNickname?: string) => {
  const { data: follow } = useQuery({
    queryKey: ['follow'],
    queryFn: () => instance.get(ENDPOINTS.FOLLOWS.LIST).then(res => res.data),
  });

  const followList: FollowItem[] = follow ?? [];
  const followData = followList.find(
    f =>
      f.follow.nickname.trim().toLowerCase() ===
      (targetNickname ?? '').trim().toLowerCase(),
  );

  return {
    isFollowing: !!followData,
    followId: followData?.id,
    followList,
  };
};
