import { createAsyncThunk } from '@reduxjs/toolkit';
import { z } from 'zod';

import { env } from '@/config/env';
import { api } from '@/lib/api-client';
import { AuthResponse } from '@/types/api';

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type loginInputTypes = z.infer<typeof loginInputSchema>;

export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export type registerInputTypes = z.infer<typeof registerInputSchema>;

export const postLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: loginInputTypes, { rejectWithValue }) => {
    try {
      const response: AuthResponse = await api.post(
        `${env.API_URL}/auth/login`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: { email, password },
        },
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const postRegister = createAsyncThunk(
  'auth/register',
  async (
    { email, password, firstName, lastName }: registerInputTypes,
    { rejectWithValue },
  ) => {
    try {
      const response: AuthResponse = await api.post(
        `${env.API_URL}/auth/register`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: { email, password, firstName, lastName },
        },
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
