import { useEffect } from 'react';
import { useAuthStore } from '@store/useAuthStore';

export function useNotificationWebSocket() {
  const token =
    useAuthStore.getState().access || localStorage.getItem('access');
  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8000/ws/notifications/?token=${token}`,
    );
    console.log(ws);

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
  }, [token]);
}
