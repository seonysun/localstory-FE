'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import WideCard from '@/components/ui/common/cards/WideCard';
import WideCardContent from '@/components/ui/common/cards/WideCardContent';
import FilterDropdown from '@/components/ui/common/dropdowns/FilterDropdown';
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';
import Modal from '@/components/ui/common/modals/Modal';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import { Likes } from '@/components/ui/common/toggles';
import { MAP_DROPDOWN_OPTIONS } from '@/constants/map';

import { css } from '@root/styled-system/css';

function MapResults({ query }: { query: string }) {
  const router = useRouter();

  const [selected, setSelected] = useState(MAP_DROPDOWN_OPTIONS[0].value);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selected === 'distance' && !coords && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          setError(`위치 정보를 가져올 수 없습니다: ${error.message}`);
        },
      );
    }
  }, [selected, coords]);

  const { data, isLoading } = useQuery(
    markerOption.getMarkerList({
      search_term: query,
      sort: selected,
      ...(selected === 'distance' && coords
        ? coords
        : { latitude: 35.179554, longitude: 129.075642 }),
    }),
  );
  const searchList = data?.data ?? [];

  useEffect(() => {
    if (selected === 'distance' && searchList.length === 0) {
      setError('반경(10km) 내 결과가 없어 최신순으로 조회합니다');
      setSelected('latest');
    }
  }, [data, selected]);

  const { mutate } = useMutation(markerOption.postMarkerLike());

  if (isLoading)
    return (
      <div>
        <SpinnerMessage />
      </div>
    );

  return (
    <div className={flex({ p: 'md', marginB: 'sm' })}>
      {query.trim() === '' || searchList.length < 1 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className={flex({ gap: 'lg' })}>
          <div className={flexBetween()}>
            <p>
              <span className={modalText({ text: 'search' })}>{query}</span>
              &nbsp;에 대한 검색 결과: {data?.pagination.totalItems}건
            </p>
            <div>
              <FilterDropdown
                options={MAP_DROPDOWN_OPTIONS}
                selected={selected}
                onChange={value => setSelected(value)}
              />
            </div>
          </div>
          <div className={flex({ gap: 'lg' })}>
            {searchList?.map(place => (
              <WideCard key={place.id} image={place.image}>
                <WideCardContent
                  title={place.markerName}
                  subtitle={place.layer}
                  date={false}
                  footerType="location"
                  footerText={place.adress || '장소 정보 없음'}
                  action={
                    <Likes
                      liked={place.isLiked}
                      onChange={() => mutate(place.id)}
                    />
                  }
                  onClick={() => router.push(`/map/${place.id}`)}
                />
              </WideCard>
            ))}
          </div>
        </div>
      )}
      {error && (
        <Modal
          title="알림"
          content={error}
          type="one"
          onConfirm={() => setError(null)}
          className={css({ animation: 'shake 0.5s' })}
        />
      )}
    </div>
  );
}

export default MapResults;
