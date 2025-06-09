'use client';

import { useState } from 'react';
import { MapMarker, MapMarkerProps, useMap } from 'react-kakao-maps-sdk';

import { CategoryValueType } from '@/constants/map';

type MarkerContainerProps = {
  position: MapMarkerProps['position'];
  type?: CategoryValueType;
  content?: string;
  onClick?: () => void;
};

function MarkerContainer({
  position,
  type,
  content,
  onClick,
}: MarkerContainerProps) {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <MapMarker
      position={position}
      image={{
        src: `/images/markers/${type}.png`,
        size: { width: 32, height: 32 },
      }}
      clickable
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
      onClick={marker => {
        map.panTo(marker.getPosition());
        onClick?.();
      }}
    >
      {isVisible && <div>{content}</div>}
    </MapMarker>
  );
}

export default MarkerContainer;
