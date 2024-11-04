import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth/auth.state';
import { AuthService } from './auth/auth.service';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, SigninComponent, SignupComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Penny';
}
