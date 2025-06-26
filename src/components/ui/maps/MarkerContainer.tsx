'use client';

import { useState } from 'react';
import { MapMarker, MapMarkerProps, useMap } from 'react-kakao-maps-sdk';

import { CategoryValueType } from '@/constants/map';

import { css } from '@root/styled-system/css';

type MarkerContainerProps = {
  position: MapMarkerProps['position'];
  type?: CategoryValueType | 'current';
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

  const defaultSize = { width: 32, height: 32 };
  const overSize = { width: 40, height: 40 };

  return (
    <MapMarker
      position={position}
      image={{
        src: `/images/markers/${type}.png`,
        size: isVisible ? overSize : defaultSize,
      }}
      clickable
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
      onClick={marker => {
        map.panTo(marker.getPosition());
        onClick?.();
      }}
    >
      {isVisible && (
        <div
          className={css({
            padding: 1,
            textStyle: 'body3',
            background: 'white',
          })}
        >
          {content}
        </div>
      )}
    </MapMarker>
  );
}

export default MarkerContainer;
