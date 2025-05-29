'use client';

import React, { useState } from 'react';

import * as iconMap from '@/components/icons';

import { css } from '@root/styled-system/css';

const icons = Object.entries(iconMap);

function IconPreview() {
  const [search, setSearch] = useState('');
  const [copiedIconName, setCopiedIconName] = useState('');
  const filteredIcons = icons.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  const onClick = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedIconName(name);
      setTimeout(() => setCopiedIconName(''), 1000);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(
        '클립보드 복사에 실패했습니다. 브라우저 설정 또는 HTTPS 환경을 확인해주세요.',
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        className={css({
          border: '5px solid black',
          borderRadius: 'md',
          marginTop: '100px',
          width: '100%',
          p: 4,
        })}
        value={search}
        placeholder="검색할 아이콘 이름(영어)을 입력하세요."
        onChange={e => setSearch(e.target.value)}
      />
      <p
        className={css({
          textAlign: 'center',
          marginTop: '16px',
          fontSize: '20px',
          fontWeight: 'bold',
        })}
      >
        개발 모드에서만 사용하는 페이지입니다. <br /> 배포시 삭제합니다. 다른
        곳에서 가져다 쓸 때는 <br />
        <code>
          import {'{JourneyIcon}'} from {`'@components/icons'`};
        </code>
        이렇게 사용하세요.
      </p>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          marginTop: '100px',
        })}
      >
        {filteredIcons.length > 0 &&
          filteredIcons.map(([name, Icon]) => (
            <div
              key={name}
              className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                borderBottom: '1px solid black',
                borderRight: '1px solid black',
              })}
            >
              <p
                className={css({
                  fontSize: '20px',
                  marginTop: '8px',
                  textAlign: 'center',
                })}
              >
                {name}
              </p>

              <button
                type="button"
                onClick={() => onClick(name)}
                className={css({
                  marginBottom: '10px',
                })}
              >
                <span className={css({ fontSize: '20px' })}>
                  {copiedIconName === name ? '복사완료' : '복사'}
                </span>
                <Icon width={70} height={70} color="blue" stroke="yellow" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default IconPreview;
