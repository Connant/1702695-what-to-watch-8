import { Middleware } from '@reduxjs/toolkit';
import { ActionType } from './action';
import { State } from './reducer';
import { browserHistory } from './history';

export const redirect: Middleware<unknown, State> = (_store) => (next) => (action) => {
  if (action.type === ActionType.RedirectToRoute) {
    browserHistory.push(action.payload);
  }
  return next(action);
};
