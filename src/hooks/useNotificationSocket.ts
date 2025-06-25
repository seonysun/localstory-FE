import { useEffect } from 'react';

export function useNotificationWebSocket(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return undefined;

    const ws = new WebSocket(
      `ws://localhost:8000/ws/notifications?userId=${userId}`,
    );

    ws.onopen = () => {
      // 연결 성공 시
      console.log('WebSocket connected');
    };

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        alert(data.message || '새 알림이 도착했습니다!');
      } catch (e) {
        console.error('Invalid message:', event.data);
      }
    };

    ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [userId]);
}
