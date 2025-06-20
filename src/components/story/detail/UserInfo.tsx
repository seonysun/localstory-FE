import React from 'react';
import Image from 'next/image';
import StoryContentActions from '@components/story/detail/StoryContentActions';

import { css } from '@root/styled-system/css';

type Props = {
  createdAt: string | undefined;
  userNickname: string | undefined;
  userProfileImage: string | undefined;
};

function UserInfo({ createdAt, userNickname, userProfileImage }: Props) {
  const defaultUserImage = '/images/default-userImage.png';

  return (
    <article>
      <div className={css({ display: 'flex', gap: 4 })}>
        <Image
          src={userProfileImage || defaultUserImage}
          alt="userImage"
          width={40}
          height={40}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.src = defaultUserImage;
          }}
        />
        <div>
          <p>
            {createdAt ? new Date(createdAt).toLocaleDateString() : undefined}
          </p>
          <p>{userNickname}</p>
        </div>
        <StoryContentActions />
      </div>
    </article>
  );
}

export default UserInfo;
