import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../store/auth/auth.state';
import * as AuthActions from '../store/auth/auth.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.isAuthenticated$ = this.store.select(
      (state) => state.auth.isAuthenticated
    );
  }

  singout() {
    this.store.dispatch(AuthActions.signout());
  }
}
