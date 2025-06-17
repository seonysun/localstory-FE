export type Message = {
  role: 'assistant' | 'user';
  content: string;
  desc?: string;
};

export type APIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};
