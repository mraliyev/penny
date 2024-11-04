import { createAction, props } from '@ngrx/store';

// Signin
export const signin = createAction(
  '[Auth] Signin',
  props<{ email: string; password: string }>()
);

export const signinSuccess = createAction(
  '[Auth] Signin Success',
  props<{ user: { accessToken: string } }>()
);

export const signinFailure = createAction(
  '[Auth] Signin Failure',
  props<{ error: string }>()
);

// Signup
export const signup = createAction(
  '[Auth] Signup',
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: { accessToken: string } }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

export const authFailure = createAction(
  '[Auth] Failure',
  props<{ error: string }>()
);

// Signout
export const signout = createAction('[Auth] Signout');

// Check Email
export const checkEmailExists = createAction(
  '[Auth] Check Email',
  props<{ email: string }>()
);

export const checkEmailExistsSuccess = createAction(
  '[Auth] Check Email Success',
  props<{ isRegistered: boolean }>()
);

export const checkEmailExistsFailure = createAction(
  '[Auth] Check Email Failure',
  props<{ error: string }>()
);

// Messages
export const showSuccessMessage = createAction(
  '[Auth/API] Show Success Message',
  props<{ message: string }>()
);

export const showErrorMessage = createAction(
  '[Auth/API] Show Error Message',
  props<{ error: string }>()
);
