'use client';

import { Map, Polyline } from 'react-kakao-maps-sdk';

import { mapOverlayWrapper } from '@/components/map/map.recipe';
import RouteList from '@/components/map/RouteList';
import { Button } from '@/components/ui/common/buttons/Button';
import WideCard from '@/components/ui/common/cards/WideCard';
import WideCardContent from '@/components/ui/common/cards/WideCardContent';
import Modal from '@/components/ui/common/modals/Modal';
import { Likes } from '@/components/ui/common/toggles';
import MarkerContainer from '@/components/ui/maps/MarkerContainer';
import MarkerIcon from '@/components/ui/maps/MarkerIcon';
import RouteCreateModal from '@/components/ui/maps/RouteCreateModal';
import RouteMarkModal from '@/components/ui/maps/RouteMarkModal';
import { CategoryValueType, MAP_CATEGORY } from '@/constants/map';
import { useModalStore } from '@/store/useModalStore';
import { Marker } from '@/types/marker';

import { css } from '@root/styled-system/css';

type MapViewProps = {
  error: string | null;
  setError: (err: string | null) => void;
  center: { lat: number; lng: number };
  setCenter: (center: { lat: number; lng: number }) => void;
  routeOpen: boolean;
  setRouteOpen: (open: boolean) => void;
  polylinePath: { lat: number; lng: number }[];
  position: boolean;
  routeId: string | null;
  selectedCategory: CategoryValueType;
  markers: Marker[];
  place: Marker | undefined;
  markerClick: (key: 'id' | 'type', value: string) => void;
  likeClick: (id: number) => void;
  cardClick: () => void;
  boundsChange?: (map: kakao.maps.Map) => void;
};

function MapView({
  error,
  setError,
  center,
  setCenter,
  routeOpen,
  setRouteOpen,
  polylinePath,
  position,
  routeId,
  selectedCategory,
  markers,
  place,
  markerClick,
  likeClick,
  cardClick,
  boundsChange,
}: MapViewProps) {
  const { id, type: modalType, open, isOpen } = useModalStore();

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
      {error && (
        <Modal
          title="에러"
          content={error}
          type="one"
          onConfirm={() => setError(null)}
          className={css({ animation: 'shake 0.5s' })}
        />
      )}
      {isOpen && modalType === 'content' && <RouteCreateModal />}
      {isOpen && id === 2 && <RouteMarkModal />}
      {routeOpen && <RouteList setRouteOpen={setRouteOpen} />}
      <Map
        center={center}
        style={{ width: '100%', height: '75vh' }}
        level={8}
        onDragEnd={boundsChange}
        onZoomChanged={boundsChange}
      >
        {markers?.map(marker => (
          <MarkerContainer
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            type={
              selectedCategory === marker.layer ? selectedCategory : 'current'
            }
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
                  onChange={() => likeClick(place.id)}
                />
              }
              onClick={cardClick}
            />
          </WideCard>
        </div>
      )}
    </div>
  );
}

export default MapView;
