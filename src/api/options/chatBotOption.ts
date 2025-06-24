import { ENDPOINTS } from '@api/endpoints';
import { mutationFetcher } from '@api/fetcher';

import { APIMessage } from '@components/chatBot/types';

type Props = {
  messages: APIMessage[];
  userMessage: string;
};

export const chatBotOptions = {
  postChatBot: () => ({
    mutationFn: (data: Props) =>
      mutationFetcher('post', ENDPOINTS.AI.CHAT, {
        messages: data.messages,
      }),
  }),
  postSummarize: () => ({
    mutationFn: (data: { marker_id?: number; raw_text: string }) =>
      mutationFetcher('post', ENDPOINTS.AI.SUMMARY, data),
  }),
};
