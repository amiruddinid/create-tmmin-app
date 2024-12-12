// store.js
import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './root-reducer';

// Create the persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Whitelist only the needed state
};

const middlewares: Middleware[] = [];

// redux logger on development
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

// Create the store
const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
  //disable devtools in production
  devTools: process.env.NODE_ENV !== 'production',
});

// Create the persist store
const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store and persistor
export { persistor, store };
