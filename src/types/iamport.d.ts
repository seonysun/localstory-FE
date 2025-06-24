export interface IamportResponse {
  success: boolean;
  error_code?: string;
  error_msg?: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  receipt_url?: string;
}

declare global {
  interface Window {
    IMP?: {
      init: (accountID: string) => void;
      request_pay: (
        params: IamportRequest,
        callback: (response: IamportResponse) => void,
      ) => void;
      close?: () => void;
    };
  }
}
