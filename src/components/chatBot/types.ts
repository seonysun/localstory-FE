export type Message = {
  type: 'bot' | 'user';
  content: string;
  desc?: string;
};
