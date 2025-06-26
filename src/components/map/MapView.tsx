'use client';

import { useEffect, useState } from 'react';
import { Map, Polyline, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { routeOption } from '@/api/options/routeOption';
import { mapOverlayWrapper } from '@/components/map/map.recipe';
import RouteList from '@/components/map/RouteList';
import { Button } from '@/components/ui/common/buttons/Button';
import WideCard from '@/components/ui/common/cards/WideCard';
import WideCardContent from '@/components/ui/common/cards/WideCardContent';
import { Likes } from '@/components/ui/common/toggles';
import MarkerContainer from '@/components/ui/maps/MarkerContainer';
import MarkerIcon from '@/components/ui/maps/MarkerIcon';
import RouteCreateModal from '@/components/ui/maps/RouteCreateModal';
import RouteMarkModal from '@/components/ui/maps/RouteMarkModal';
import { CategoryValueType, MAP_CATEGORY } from '@/constants/map';
import { useModalStore } from '@/store/useModalStore';
import { isValidCategory } from '@/util/map';

import { css } from '@root/styled-system/css';

function MapView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const [center, setCenter] = useState({ lat: 35.179554, lng: 129.075642 });

  const position = searchParams.get('position') === 'true';
  useEffect(() => {
    if (position && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        error => {
          console.warn('위치 정보를 가져올 수 없습니다:', error.message);
        },
        { timeout: 5000 },
      );
    }
  }, [position]);

  const type = searchParams.get('type');
  const selectedCategory: CategoryValueType = isValidCategory(type)
    ? (type as CategoryValueType)
    : MAP_CATEGORY[0].value;
  const { data } = useQuery(
    markerOption.getMarkerList({ layer: selectedCategory }),
  );

  const routeId = searchParams.get('route');
  const { data: route } = useQuery({
    ...routeOption.getRouteDetail(Number(routeId)),
    enabled: !!routeId,
  });

  const markers = type ? (data?.data ?? []) : (route?.data.markers ?? []);

  const markerId = Number(searchParams.get('id'));
  const { data: place } = useQuery({
    ...markerOption.getMarkerDetail(markerId ?? 0),
    enabled: !!markerId,
  });

  const { mutate } = useMutation(markerOption.postMarkerLike());

  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[]
  >([]);

  useEffect(() => {
    if (routeId && route?.data.markers) {
      const path = route.data.markers.map(marker => ({
        lat: Number(marker.latitude),
        lng: Number(marker.longitude),
      }));
      setPolylinePath(path);
    } else {
      setPolylinePath([]);
    }
  }, [routeId, route]);

  const markerClick = (param: string, value: string) => {
    if (param === 'type') {
      setPolylinePath([]);
    }

    const next = new URLSearchParams(searchParams);
    next.set(param, value);
    next.set('position', 'false');
    router.push(`/map/search?${next.toString()}`);
  };

  const { id, type: modalType, open, isOpen } = useModalStore();

  const [routeOpen, setRouteOpen] = useState(false);

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
              markerClick('type', category.value);
              setCenter({ lat: 35.179554, lng: 129.075642 });
            }}
          />
        ))}
      </div>
      <div className={mapOverlayWrapper({ type: 'routeMaker' })}>
        <Button size="sm" color="outline" onClick={() => open('content')}>
          루트 만들기
        </Button>
      </div>
      <div className={mapOverlayWrapper({ type: 'route' })}>
        <Button size="sm" color="outline" onClick={() => setRouteOpen(true)}>
          루트 둘러보기
        </Button>
      </div>
      {isOpen && modalType === 'content' && <RouteCreateModal />}
      {isOpen && id === 2 && <RouteMarkModal />}
      {routeOpen && <RouteList setRouteOpen={setRouteOpen} />}
      <Map center={center} style={{ width: '100%', height: '75vh' }} level={8}>
        {markers?.map(marker => (
          <MarkerContainer
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            type={type ? selectedCategory : 'current'}
            content={marker.markerName}
            onClick={() => markerClick('id', marker.id.toString())}
          />
        ))}
        {position && <MarkerContainer position={center} type="current" />}
        {routeId && polylinePath.length > 1 && (
          <Polyline
            path={polylinePath}
            strokeWeight={4}
            strokeColor="red"
            strokeOpacity={0.8}
            strokeStyle="solid"
          />
        )}
      </Map>
      {place && (
        <div className={mapOverlayWrapper({ type: 'card' })}>
          <WideCard image={place.image}>
            <WideCardContent
              title={place.markerName}
              subtitle={place.layer}
              date={false}
              footerType="location"
              footerText={place?.adress || '장소 정보 없음'}
              action={
                <Likes
                  liked={place.isLiked}
                  onChange={() => mutate(place.id)}
                />
              }
              onClick={() => router.push(`/map/${place?.id}`)}
            />
          </WideCard>
        </div>
      )}
    </div>
  );
}

export default MapView;
