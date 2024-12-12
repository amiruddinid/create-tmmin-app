import { combineReducers } from '@reduxjs/toolkit';

import { appAlert } from './app-alert';
import { auth } from './auth';

const rootReducer = combineReducers({
  //shared
  appAlert,

  //features
  auth,
});

export default rootReducer;
