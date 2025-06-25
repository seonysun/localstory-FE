import { create } from 'zustand';

import type { NotificationSetting } from '@/types/settings';

// Zustand 사용(공통 알림 설정 상태)
interface NotificationState {
  settings: NotificationSetting[];
  setSettings: (settings: NotificationSetting[]) => void;
  updateSetting: (type: string, enabled: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  settings: [],
  setSettings: settings => set({ settings }),
  updateSetting: (type, enabled) => {
    set(state => ({
      settings: state.settings.map(s =>
        s.type === type ? { ...s, enabled } : s,
      ),
    }));
  },
}));
