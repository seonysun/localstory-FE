'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import StoryContentActions from '@components/story/detail/StoryContentActions';
import { useAuthStore } from '@store/useAuthStore';

import { css } from '@root/styled-system/css';

type Props = {
  createdAt: string | undefined;
  userNickname: string | undefined;
  userProfileImage: string | undefined;
};

function UserInfo({ createdAt, userNickname, userProfileImage }: Props) {
  const { user } = useAuthStore();
  const isMine = user?.nickname === userNickname;
  const defaultUserImage = '/images/default-userImage.png';
  const [profileSrc, setProfileSrc] = useState(
    userProfileImage && userProfileImage.trim() !== ''
      ? userProfileImage
      : defaultUserImage,
  );

  return (
    <article>
      <div className={css({ display: 'flex', alignItems: 'center', gap: 4 })}>
        <Image
          src={profileSrc}
          alt="userImage"
          width={40}
          height={40}
          className={css({
            objectFit: 'cover',
            height: '100%',
            borderRadius: 'full',
          })}
          onError={() => setProfileSrc(defaultUserImage)}
        />
        <div
          className={css({
            fontSize: {
              base: 'sm',
              md: 'sm',
            },
          })}
        >
          <p>
            {createdAt ? new Date(createdAt).toLocaleDateString() : undefined}
          </p>
          <p>{userNickname}</p>
        </div>
        <StoryContentActions isMine={isMine} />
      </div>
    </article>
  );
}

export default UserInfo;
