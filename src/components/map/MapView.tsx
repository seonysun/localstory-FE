'use client';

import { useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useRouter, useSearchParams } from 'next/navigation';

import { mapOverlayWrapper } from '@/components/map/map.recipe';
import WideCard from '@/components/ui/common/cards/WideCard';
import WideCardContent from '@/components/ui/common/cards/WideCardContent';
import { Likes } from '@/components/ui/common/toggles';
import MarkerContainer from '@/components/ui/maps/MarkerContainer';
import MarkerIcon from '@/components/ui/maps/MarkerIcon';
import { CategoryValueType, MAP_CATEGORY } from '@/constants/map';
import { mapDetail, mapMarkers } from '@/mocks/mapDetail';
import { isValidCategory } from '@/util/map';

import { css } from '@root/styled-system/css';

function MapView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const center = { lat: 35.115045, lng: 129.041519 };

  const type = searchParams.get('type');
  const selectedCategory: CategoryValueType = isValidCategory(type)
    ? (type as CategoryValueType)
    : MAP_CATEGORY[0].value;
  const data = mapMarkers;

  const [selectedMarker, setSelectedMarker] = useState<
    null | (typeof mapMarkers)[number]
  >(null);
  const place = mapDetail;

  return (
    <div className={css({ position: 'relative' })}>
      <div className={mapOverlayWrapper()}>
        {MAP_CATEGORY.map(category => (
          <MarkerIcon
            key={category.value}
            label={category.label}
            icon={category.icon}
            size="md"
            selected={selectedCategory === category.value}
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.set('type', category.value);
              router.push(`/map/search?${next.toString()}`);
            }}
          />
        ))}
      </div>
      <Map center={center} style={{ width: '100%', height: '600px' }} level={5}>
        {data?.map(marker => (
          <MarkerContainer
            key={marker.id}
            position={marker.latlng}
            type={selectedCategory}
            content={marker.place}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
      </Map>
      {selectedMarker && (
        <div className={mapOverlayWrapper({ type: 'card' })}>
          <WideCard image={place.image}>
            <WideCardContent
              title={place.title}
              subtitle={place.type}
              date={false}
              rating={place.rating}
              footerType="location"
              footerText={place.location}
              action={<Likes liked={place.liked} />}
              onClick={() => router.push(`/map/${place.id}`)}
            />
          </WideCard>
        </div>
      )}
    </div>
  );
}

export default MapView;
