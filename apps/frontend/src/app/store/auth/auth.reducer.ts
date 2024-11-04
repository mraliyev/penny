import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signinSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.signinFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error,
  })),
  on(AuthActions.signup, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.signout, () => initialState),
  on(AuthActions.checkEmailExistsSuccess, (state, { isRegistered }) => ({
    ...state,
    isRegistered,
    error: null,
  })),
  on(AuthActions.checkEmailExistsFailure, (state, { error }) => ({
    ...state,
    isRegistered: false,
    error,
  }))
);
