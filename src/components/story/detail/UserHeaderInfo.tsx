import React from 'react';
import Image from 'next/image';
import { userInfoWrapperStyle } from '@components/story/detail/comment.recipe';

import defaultUserProfile from '@images/default-userImage.png';

type Props = {
  userName: string;
  createdAt: string;
  userProfileImage?: string;
};
// 유저 정보를 보여주는 컴포넌트 서버 API 나오면 유저 정보 받아야 함
function UserHeaderInfo({ userName, createdAt, userProfileImage }: Props) {
  return (
    <div className={userInfoWrapperStyle()}>
      <Image
        src={userProfileImage || defaultUserProfile}
        alt="프로필"
        width={48}
        height={48}
      />
      <div>
        <p>{userName}</p>
        <p> {new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default UserHeaderInfo;
