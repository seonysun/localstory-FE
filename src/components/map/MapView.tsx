'use client';

import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { mapOverlayWrapper } from '@/components/map/map.recipe';
import WideCard from '@/components/ui/common/cards/WideCard';
import WideCardContent from '@/components/ui/common/cards/WideCardContent';
import { Likes } from '@/components/ui/common/toggles';
import MarkerContainer from '@/components/ui/maps/MarkerContainer';
import MarkerIcon from '@/components/ui/maps/MarkerIcon';
import { CategoryValueType, MAP_CATEGORY } from '@/constants/map';
import { isValidCategory } from '@/util/map';

import { css } from '@root/styled-system/css';

function MapView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const center = { lat: 35.179554, lng: 129.075642 };

  const type = searchParams.get('type');
  const selectedCategory: CategoryValueType = isValidCategory(type)
    ? (type as CategoryValueType)
    : MAP_CATEGORY[0].value;
  const { data } = useQuery(
    markerOption.getMarkerList({ layer: selectedCategory }),
  );
  const markers = data?.data ?? [];

  const markerId = Number(searchParams.get('id'));
  const { data: place } = useQuery({
    ...markerOption.getMarkerDetail(markerId ?? 0),
    enabled: !!markerId,
  });

  const markerClick = (param: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    next.set(param, value);
    router.push(`/map/search?${next.toString()}`);
  };

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
            onClick={() => markerClick('type', category.value)}
          />
        ))}
      </div>
      <Map center={center} style={{ width: '100%', height: '600px' }} level={8}>
        {markers?.map(marker => (
          <MarkerContainer
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            type={selectedCategory}
            content={marker.markerName}
            onClick={() => markerClick('id', marker.id.toString())}
          />
        ))}
      </Map>
      {place && (
        <div className={mapOverlayWrapper({ type: 'card' })}>
          <WideCard image={place?.image}>
            <WideCardContent
              title={place?.markerName}
              subtitle={place?.layer}
              date={false}
              footerType="location"
              footerText={place?.adress}
              action={<Likes liked={place?.isLiked} />}
              onClick={() => router.push(`/map/${place?.id}`)}
            />
          </WideCard>
        </div>
      )}
    </div>
  );
}

export default MapView;
