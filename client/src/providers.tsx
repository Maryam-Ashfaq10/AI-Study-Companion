import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from './lib/queryClient';
import { AuthProvider } from './contexts/AuthContext';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>

    </QueryClientProvider>
  );
}

export default Providers;