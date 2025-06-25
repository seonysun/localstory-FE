export interface NotificationSetting {
  id: string;
  type: string;
  enabled: boolean;
}

export type NotificationSettings = NotificationSetting[];

export interface UpdateNotificationSettingPayload {
  type: string;
  enabled: boolean;
}
