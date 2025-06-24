import { ENDPOINTS } from '@api/endpoints';

import { mutationFetcher } from '@/api/fetcher';

export const paymentOption = {
  postSubscribes: () => ({
    mutationFn: ({
      imp_uid,
      merchant_uid,
    }: {
      imp_uid: string;
      merchant_uid: string;
    }) => {
      return mutationFetcher('post', ENDPOINTS.SUBSCRIBE.LIST, {
        imp_uid,
        merchant_uid,
      });
    },
  }),
};
