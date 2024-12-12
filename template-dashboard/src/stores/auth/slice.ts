import { createSlice } from '@reduxjs/toolkit';

import { AuthResponse, User } from '@/types/api';
import { StateEntity } from '@/types/state';

import {
  loginInputTypes,
  postLogin,
  postRegister,
  registerInputTypes,
} from './api';

type AuthStateType = StateEntity<{
  data: User | null;
  token: string | null;
  message: string | null;
  isLogin: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
}>;

const initialState: AuthStateType = {
  data: null,
  token: null,
  message: null,
  isLogin: false,
  status: 'idle',
  lastAction: null,
  lastUpdated: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: () => initialState,
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.status = 'success';
      state.message = 'Berhasil Login';
      state.isLogin = true;
      state.token = action.payload.jwt;
      state.data = action.payload.user;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload as string;
    });

    builder.addCase(postRegister.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.status = 'success';
      state.message = 'Berhasil Register';
      state.token = action.payload.jwt;
      state.data = action.payload.user;
    });
    builder.addCase(postRegister.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload as string;
    });
  },
  selectors: {
    selectUser: (state) => state,
  },
});

export const { resetState, setState } = authSlice.actions;
export const { selectUser } = authSlice.selectors;
export const auth = authSlice.reducer;
export { postLogin, postRegister };
export type {
  AuthResponse,
  AuthStateType,
  loginInputTypes,
  registerInputTypes,
};
