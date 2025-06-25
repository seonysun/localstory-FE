export interface NotificationSetting {
  id: number;
  type: 'followe' | 'post' | 'comment';
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}
