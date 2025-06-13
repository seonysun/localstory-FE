import React from 'react';
import Link from 'next/link';
import isMatchedByKeywordAndRegion from '@components/story/utils/isMatchedByKeywordAndRegion';
import normalizeText from '@components/story/utils/normalizeText';
import StoryCard from '@components/ui/common/cards/StoryCard';

import { mockStoryList } from '@/mocks/mockStoryList';

import { css } from '@root/styled-system/css';

function StoryListSection({
  keyword,
  region,
}: {
  keyword: string;
  region: string;
}) {
  const filteredData = mockStoryList.filter(item => {
    const lowerKeyword = normalizeText(keyword);
    const lowerRegion = normalizeText(region);
    const title = normalizeText(item.title);
    const content = normalizeText(item.content);
    return isMatchedByKeywordAndRegion(
      title,
      content,
      lowerKeyword,
      lowerRegion,
    );
  });

  return (
    <article className={css({ mb: 12 })}>
      <div className={css({ mb: 12 })}>
        <h1 className={css({ textStyle: 'headline3' })}>서울 여행</h1>
        <p className={css({ textStyle: 'body2', mt: 2 })}>
          직접 다녀온 생생한 후기를 확인해보세요
        </p>
      </div>
      {filteredData.length > 0 ? (
        filteredData.map(item => (
          <div
            key={item.id}
            className={css({
              display: 'flex',
              flexDirection: 'column',
              mb: 8,
            })}
          >
            <Link href={`/story/${item.id}`}>
              <StoryCard
                images={[item.img]}
                title={item.title}
                content={item.content}
              />
            </Link>
          </div>
        ))
      ) : (
        <p>스토리가 없습니다.</p>
      )}
    </article>
  );
}

export default StoryListSection;
