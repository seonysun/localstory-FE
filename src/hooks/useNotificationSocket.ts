import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import type { NotificationSetting } from '@/types/settings';

export function useNotificationSocket(userId: string | undefined) {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([]);

  useEffect(() => {
    if (!userId) return undefined;

    const socket: Socket = io('http://localhost:8000/', { query: { userId } });

    socket.on('notification', notification => {
      setNotifications(prev => [notification, ...prev]);
      // TODO: 토스트 알림이나 인앱 알림 컴포넌트로 교체
      alert('알림 옴');
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return notifications;
}
