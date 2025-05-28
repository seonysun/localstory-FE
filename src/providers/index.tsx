'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProviderProps from '@/providers/type';

const query = new QueryClient();

const Providers = ({ children }: ProviderProps) => {
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};

export default Providers;
