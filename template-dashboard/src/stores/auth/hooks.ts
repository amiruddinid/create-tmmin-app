import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '@/stores';

import {
  AuthResponse,
  AuthStateType,
  loginInputTypes,
  postLogin,
  postRegister,
  registerInputTypes,
  resetState,
  selectUser,
  setState,
} from './slice';

export const useUser = () => {
  const dispatch = useDispatch();
  const dispacther = (state: Partial<AuthStateType>) =>
    dispatch(setState(state));
  const state = useSelector(selectUser);
  return [state, dispacther] as const;
};

export const useLogin = (onSuccess: (response: AuthResponse) => void) => {
  const dispatch = useDispatch<AppDispatch>();
  return (data: loginInputTypes) =>
    dispatch(postLogin(data))
      .then(
        (action) =>
          action.meta.requestStatus === 'fulfilled' &&
          onSuccess(action.payload as AuthResponse),
      )
      .finally(() => {
        setTimeout(() => {
          dispatch(setState({ status: 'idle' }));
        }, 1000);
      });
};

export const useRegister = (onSuccess: (response: AuthResponse) => void) => {
  const dispatch = useDispatch<AppDispatch>();
  return (data: registerInputTypes) =>
    dispatch(postRegister(data))
      .then(
        (action) =>
          action.meta.requestStatus === 'fulfilled' &&
          onSuccess(action.payload as AuthResponse),
      )
      .finally(() => {
        setTimeout(() => {
          dispatch(setState({ status: 'idle' }));
        }, 1000);
      });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  return () => dispatch(resetState());
};
