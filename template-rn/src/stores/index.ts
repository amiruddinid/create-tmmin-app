// store.js
import {configureStore, Middleware} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
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
  Storage,
} from 'redux-persist';

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

import rootReducer from './root-reducer';

// Create the persist config
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
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
  middleware: getDefaultMiddleware =>
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
export {persistor, store};
