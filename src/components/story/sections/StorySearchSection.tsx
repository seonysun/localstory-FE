'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import { Search } from '@components/ui/common/textfields';
import { useQuery } from '@tanstack/react-query';

import useDebounce from '@/hooks/useDebounce';

import { css } from '@root/styled-system/css';

type Users = {
  id: number;
  nickname: string;
  profileImage: string;
};

type Props = {
  users: Users[];
};

function StorySearchSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') ?? '';
  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue !== query) {
      router.replace(`?query=${encodeURIComponent(debouncedValue)}`);
    }
  }, [debouncedValue, query, router]);

  const { data, isError } = useQuery<Props>({
    queryKey: ['search', query],
    queryFn: () =>
      instance
        .get(`${ENDPOINTS.SEARCH.LIST}?query=${query}`)
        .then(res => res.data),
    enabled: !!query,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const defaultUserImage = '/images/default-userImage.png';
  if (isError) return <p>Error...</p>;
  return (
    <article className={css({ mt: 24 })}>
      <div>
        <Search
          placeholder="유저 이름을 검색해주세요..."
          value={inputValue}
          onChange={onChange}
        />
        <ul
          className={css({
            mt: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          })}
        >
          {data &&
            data.users.length > 0 &&
            data.users.map(item => (
              <li
                key={item.id}
                className={css({
                  cursor: 'pointer',
                  mb: 4,
                  gap: 4,
                })}
              >
                <button
                  type="button"
                  aria-label={`${item.nickname} 프로필로 이동`}
                  className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    cursor: 'pointer',
                  })}
                  onClick={() =>
                    router.push(
                      `/user?nickname=${encodeURIComponent(item.nickname)}`,
                    )
                  }
                >
                  {/* Image Next 사용 시 get 무한 요청으로 차선책 img태그로 교체 */}
                  <img
                    src={
                      item.profileImage && item.profileImage.trim() !== ''
                        ? item.profileImage
                        : defaultUserImage
                    }
                    alt={item.nickname}
                    width={30}
                    height={30}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '50%',
                      height: '100%',
                    }}
                    onError={e => {
                      e.currentTarget.src = defaultUserImage;
                    }}
                  />
                  <p className={css({ mt: 2, textStyle: 'body3' })}>
                    {item.nickname}
                  </p>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </article>
  );
}

export default StorySearchSection;
