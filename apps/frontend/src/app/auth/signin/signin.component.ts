import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  error$: Observable<string | null>;
  successMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private authService: AuthService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.successMessage$ = this.store.select(
      (state) => state.auth.successMessage
    );

    this.error$ = this.store.select((state) => state.auth.error);
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      return this.store.dispatch(
        AuthActions.signinSuccess({
          user: { accessToken: localStorage.getItem('idToken') || '' },
        })
      );
    }
    this.store.dispatch(AuthActions.signout());
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      this.store.dispatch(AuthActions.signin({ email, password }));
    }
  }
}
