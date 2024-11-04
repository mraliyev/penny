import { Route } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  { path: '', canActivate: [authGuard], component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
];
