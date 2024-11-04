import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthState } from '../store/auth/auth.state';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);

  return store.select((state) => {
    if (state.auth.isAuthenticated) return true;

    router.navigate(['/signin']);
    return false;
  });
};
