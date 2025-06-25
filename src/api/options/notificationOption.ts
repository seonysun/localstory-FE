import { ENDPOINTS } from '@api/endpoints';

import { mutationFetcher } from '@/api/fetcher';
import { UpdateNotificationSettingPayload } from '@/types/notification';

export const notificationOption = {
  updateNotificationSetting: (id: string) => ({
    mutationFn: (payload: UpdateNotificationSettingPayload) =>
      mutationFetcher('put', ENDPOINTS.NOTIFICATIONS.DETAIL(id), payload),
  }),
  postSubscribes: () => ({
    mutationFn: ({
      imp_uid,
      merchant_uid,
    }: {
      imp_uid?: string;
      merchant_uid?: string;
    }) => {
      return mutationFetcher('post', ENDPOINTS.SUBSCRIBE.LIST, {
        imp_uid,
        merchant_uid,
      });
    },
  }),
};
