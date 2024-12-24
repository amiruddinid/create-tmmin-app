import {Store} from '@reduxjs/toolkit';
import Axios, {InternalAxiosRequestConfig} from 'axios';
import {nanoid} from 'nanoid';

import {env} from '@/config/env';

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
    response => {
      console.log('response', response);
      return response.data;
    },
    error => {
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
      }
      return Promise.reject(error);
    },
  );
};
