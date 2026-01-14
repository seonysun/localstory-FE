'use client';

import { useEffect, useMemo, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { routeOption } from '@/api/options/routeOption';
import MapView from '@/components/map/MapView';
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';
import { CategoryValueType, MAP_CATEGORY } from '@/constants/map';
import { isValidCategory } from '@/util/map';

import { css } from '@root/styled-system/css';

function MapViewContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mapLoading, mapError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const [error, setError] = useState<string | null>(null);
  const [center, setCenter] = useState({ lat: 35.179554, lng: 129.075642 });
  const [routeOpen, setRouteOpen] = useState(false);
  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[]
  >([]);

  const [bounds, setBounds] = useState<{
    minlat?: number;
    maxlat?: number;
    minlng?: number;
    maxlng?: number;
  } | null>(null);

  const position = searchParams.get('position') === 'true';
  const type = searchParams.get('type');
  const routeId = searchParams.get('route');
  const markerId = Number(searchParams.get('id'));

  const selectedCategory: CategoryValueType = isValidCategory(type)
    ? (type as CategoryValueType)
    : MAP_CATEGORY[0].value;

  const { data: marker } = useQuery(
    markerOption.getMarkerList({ layer: selectedCategory }),
  );

  const { data: route } = useQuery({
    ...routeOption.getRouteDetail(Number(routeId)),
    enabled: !!routeId,
  });

  const { data: place } = useQuery({
    ...markerOption.getMarkerDetail(markerId ?? 0),
    enabled: !!markerId,
  });

  const markers = type ? (marker?.data ?? []) : (route?.data.markers ?? []);
  const visibleMarkers = useMemo(() => {
    if (!bounds) return markers;

    return markers.filter(marker => {
      const lat = Number(marker.latitude);
      const lng = Number(marker.longitude);
      return (
        lat >= bounds.minlat! &&
        lat <= bounds.maxlat! &&
        lng >= bounds.minlng! &&
        lng <= bounds.maxlng!
      );
    });
  }, [markers, bounds]);

  const { mutate: toggleLike } = useMutation(markerOption.postMarkerLike());

  useEffect(() => {
    if (position && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        error => {
          setError(`위치 정보를 가져올 수 없습니다: ${error.message}`);
        },
        { timeout: 5000 },
      );
    }
  }, [position]);

  useEffect(() => {
    if (!type && routeId && route?.data.markers) {
      const path = route.data.markers.map(marker => ({
        lat: Number(marker.latitude),
        lng: Number(marker.longitude),
      }));
      setPolylinePath(path);
    } else {
      setPolylinePath([]);
    }
  }, [routeId, route, type]);

  const markerClick = (param: string, value: string) => {
    if (param === 'type') {
      setPolylinePath([]);
    }

    const next = new URLSearchParams(searchParams);
    next.set(param, value);
    next.set('position', 'false');
    router.push(`/map/search?${next.toString()}`);
  };

  const cardClick = () => {
    if (place) router.push(`/map/${place?.id}`);
  };

  const boundsChange = (map: kakao.maps.Map) => {
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    setBounds({
      minlat: sw.getLat(),
      maxlat: ne.getLat(),
      minlng: sw.getLng(),
      maxlng: ne.getLng(),
    });
  };

  if (mapLoading)
    return (
      <div>
        <SpinnerMessage />
      </div>
    );
  if (mapError)
    return (
      <div>지도를 로드하는 중 에러가 발생했습니다. {mapError.message}</div>
    );

  return (
    <div className={css({ position: 'relative' })}>
      <MapView
        error={error}
        setError={setError}
        center={center}
        setCenter={setCenter}
        routeOpen={routeOpen}
        setRouteOpen={setRouteOpen}
        polylinePath={polylinePath}
        position={position}
        routeId={routeId}
        selectedCategory={selectedCategory}
        markers={visibleMarkers}
        place={place}
        markerClick={markerClick}
        likeClick={toggleLike}
        cardClick={cardClick}
        boundsChange={boundsChange}
      />
    </div>
  );
}

export default MapViewContainer;
