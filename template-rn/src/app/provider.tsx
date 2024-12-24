import * as React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Spinner } from '@/components/ui/spinner';
import { VStack } from '@/components/ui/vstack';
import { setupAxiosInterceptors } from '@/lib/api-client';
import { persistor, store } from '@/stores';

type AppProviderProps = {
  children: React.ReactNode;
};

const Loading = () => (
  <VStack className="flex h-screen w-screen items-center justify-center">
    <Spinner size="large" />
  </VStack>
);

export const AppProvider = ({children}: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <GluestackUIProvider>
              {children}
            </GluestackUIProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

setupAxiosInterceptors(store);
