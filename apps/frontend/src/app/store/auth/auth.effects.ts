import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signin),
      mergeMap((action) =>
        this.authService.signin(action.email, action.password).pipe(
          map((user) => {
            this.authService.saveAuthState(user.accessToken);
            return AuthActions.signinSuccess({ user });
          }),
          catchError(({ error }) =>
            of(AuthActions.signinFailure({ error: error.message }))
          )
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap((action) =>
        this.authService.signup(action.email, action.password).pipe(
          map((user) => {
            this.authService.saveAuthState(user.accessToken);
            return AuthActions.signupSuccess({ user });
          }),
          tap(() =>
            AuthActions.showSuccessMessage({
              message: 'Registration successful',
            })
          ),
          catchError(({ error }) =>
            of(AuthActions.signupFailure({ error: error.message }))
          )
        )
      )
    )
  );

  checkEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkEmailExists),
      mergeMap((action) =>
        this.authService.checkEmailExists(action.email).pipe(
          map((response) => {
            return AuthActions.checkEmailExistsSuccess({
              isRegistered: response.isRegistered,
            });
          }),
          catchError((error) =>
            of(AuthActions.checkEmailExistsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  signout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signout),
        tap(() => {
          this.authService.clearAuthState();
          this.router.navigate(['/signin']);
        })
      ),
    { dispatch: false }
  );

  redirectAfterAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signinSuccess, AuthActions.signupSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
