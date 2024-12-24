import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export type appAlert = {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
};

const initialState: appAlert[] = [];

const appAlertSlice = createSlice({
  name: 'appAlert',
  initialState,
  reducers: {
    dismissAlert: (state, { payload }: { payload: string }) => {
      return state.filter((appAlert) => appAlert.id !== payload);
    },
    setAppAlert: (state, { payload }: { payload: appAlert }) => {
      state.push(payload);
    },
  },
  selectors: {
    appAlert: (state) => state,
  },
});

export const useAppAlert = () => {
  const dispatch = useDispatch();
  const appAlert = useSelector(appAlertSlice.selectors.appAlert);
  const { setAppAlert, dismissAlert } = appAlertSlice.actions;
  const addAlert = (payload: appAlert) => dispatch(setAppAlert(payload));
  const dismiss = (payload: string) => dispatch(dismissAlert(payload));
  return { appAlert, addAlert, dismiss };
};

export const appAlert = appAlertSlice.reducer;
export const { setAppAlert } = appAlertSlice.actions;
