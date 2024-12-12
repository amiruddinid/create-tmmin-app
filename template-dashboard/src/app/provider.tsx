import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { MainErrorFallback } from '@/components/errors/main';
import { AppAlert } from '@/components/ui/notifications/AppAlert';
import { Spinner } from '@/components/ui/spinner';
import { setupAxiosInterceptors } from '@/lib/api-client';
import { persistor, store } from '@/stores';
type AppProviderProps = {
  children: React.ReactNode;
};

const Loading = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Spinner size="xl" />
  </div>
);

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <ThemeProvider>
            <Provider store={store}>
              <PersistGate loading={<Loading />} persistor={persistor}>
                <AppAlert />
                {children}
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

setupAxiosInterceptors(store);
