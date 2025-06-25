import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type NotificationSetting = {
  id: number;
  type: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export function useNotificationSocket(userId: string | undefined) {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([]);

  useEffect(() => {
    if (!userId) return undefined;

    const socket: Socket = io('http://localhost:8000/', { query: { userId } });

    socket.on('notification', notification => {
      setNotifications(prev => [notification, ...prev]);
      alert('알림 옴');
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return notifications;
}
