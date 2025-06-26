'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { routeOption } from '@/api/options/routeOption';
import StoryPostPlace from '@/components/story/sections/StoryPostPlace';
import { Button } from '@/components/ui/common/buttons/Button';
import { flex } from '@/components/ui/common/cards/card.recipe';
import Modal from '@/components/ui/common/modals/Modal';
import { useModalStore } from '@/store/useModalStore';
import { PostRouteMarkerPayload } from '@/types/route';

import { css } from '@root/styled-system/css';

function RouteMarkModal() {
  const { data, close } = useModalStore();

  const [markers, setMarkers] = useState<(number | null)[]>([null]);

  const postMutation = useMutation({
    ...routeOption.postRouteMarkers(),
    onSuccess: res => {
      close();
      console.log(res);
    },
  });

  const onMarkerChange = (index: number, value: number | null) => {
    const newMarkers = [...markers];
    newMarkers[index] = value;
    setMarkers(newMarkers);
  };

  const addMarker = () => {
    setMarkers(prev => [...prev, null]);
  };

  const onSubmit = () => {
    if (!data?.id) return;

    const payloads: PostRouteMarkerPayload[] = markers
      .filter((m): m is number => m !== null)
      .map((markerId, i) => ({
        route_id: data.id,
        marker_id: markerId,
        sequence: i + 1,
      }));

    payloads.forEach(payload => {
      postMutation.mutate(payload);
    });
  };

  return (
    <Modal
      className={css({ width: '500px', height: '360px' })}
      onConfirm={onSubmit}
    >
      <div className={flex({ gap: 'sm', marginB: 'sm', overY: 'auto' })}>
        {markers.map((marker, i) => (
          <div
            key={i}
            className={flex({ direction: 'row', align: 'center', gap: 'xs' })}
          >
            <div className={css({ flex: 1 })}>
              <StoryPostPlace
                marker={marker}
                setMarker={value => onMarkerChange(i, value)}
              />
            </div>
            {markers.length > 1 && (
              <Button
                size="xs"
                color="outline"
                fullWidth={false}
                onClick={() => {
                  setMarkers(prev => prev.filter((_, idx) => idx !== i));
                }}
              >
                ✕
              </Button>
            )}
          </div>
        ))}
        <Button size="sm" color="black" onClick={addMarker}>
          + 장소 추가하기
        </Button>
      </div>
    </Modal>
  );
}

export default RouteMarkModal;
