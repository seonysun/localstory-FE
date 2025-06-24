import { create } from 'zustand';

import type { NotificationSetting } from '@/types/settings';

// 가짜 데이터 - 초기값(실제 API 연동 시 대체)
const DEFAULT_SETTINGS: NotificationSetting[] = [
  { id: 1, type: 'follower', enabled: true, createdAt: '', updatedAt: '' },
  { id: 2, type: 'post', enabled: false, createdAt: '', updatedAt: '' },
  { id: 3, type: 'comment', enabled: true, createdAt: '', updatedAt: '' },
];

// Zustand 사용(공통 알림 설정 상태)
interface NotificationState {
  settings: NotificationSetting[];
  setSettings: (settings: NotificationSetting[]) => void;
  updateSetting: (type: string, enabled: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  setSettings: settings => set({ settings }),
  updateSetting: (type, enabled) => {
    set(state => ({
      settings: state.settings.map(s =>
        s.type === type ? { ...s, enabled } : s,
      ),
    }));
  },
}));
