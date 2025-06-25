import { ENDPOINTS } from '@api/endpoints';

import { mutationFetcher } from '@/api/fetcher';
import { UpdateNotificationSettingPayload } from '@/types/notification';

export const notificationOption = {
  postNotificationSetting: () => ({
    mutationFn: (payload: UpdateNotificationSettingPayload) =>
      mutationFetcher('post', ENDPOINTS.NOTIFICATIONS.LIST, payload),
  }),
};
