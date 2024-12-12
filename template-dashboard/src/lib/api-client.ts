import { Store } from '@reduxjs/toolkit';
import Axios, { InternalAxiosRequestConfig } from 'axios';
// import { useNotifications } from '@/components/ui/notifications';
import { nanoid } from 'nanoid';

import { env } from '@/config/env';
import { paths } from '@/config/paths';

import { log } from './utils';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

export const setupAxiosInterceptors = (store: Store) => {
  api.interceptors.request.use(authRequestInterceptor);
  api.interceptors.response.use(
    (response) => {
      console.log('response', response);
      return response.data;
    },
    (error) => {
      const dispatch = store.dispatch;
      const message = error.response?.data?.message || error.message;
      dispatch({
        type: 'appAlert/setAppAlert',
        payload: {
          id: nanoid(),
          title: message,
          type: 'error',
        },
      });
      if (error.response?.status === 401) {
        const searchParams = new URLSearchParams();
        const redirectTo =
          searchParams.get('redirectTo') || window.location.pathname;
        window.location.href = paths.auth.login.getHref(redirectTo);
      }
      log('error', error);
      return Promise.reject(error);
    },
  );
};
