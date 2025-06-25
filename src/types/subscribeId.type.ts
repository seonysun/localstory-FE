export type Subscribe = {
  subscribeId: number;
  user: number;
  userEmail: string;
  impUid: string;
  merchantUid: string;
  isActive: boolean;
  startAt: string | Date;
  expiresAt: string | Date;
  isPaidUser: boolean;
};
