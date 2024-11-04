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
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isRegistered$: Observable<boolean | null>;
  error$: Observable<string | null>;
  successMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.isRegistered$ = this.store.select((state) => state.auth.isRegistered);

    this.successMessage$ = this.store.select(
      (state) => state.auth.successMessage
    );

    this.error$ = this.store.select((state) => state.auth.error);
  }

  ngOnInit(): void {
    this.signupForm
      .get('email')
      ?.valueChanges.pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((email) => {
        if (email) {
          this.store.dispatch(AuthActions.checkEmailExists({ email }));
        }
      });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      this.store.dispatch(AuthActions.signup({ email, password }));
    }
  }
}
