export interface NotificationSetting {
  id: number;
  type: 'follower' | 'post' | 'comment';
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}
