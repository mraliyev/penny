import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) {}

  signin(email: string, password: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/auth/signin`,
      {
        email,
        password,
      }
    );
  }

  signup(email: string, password: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/auth/signup`,
      {
        email,
        password,
      }
    );
  }

  checkEmailExists(email: string): Observable<{ isRegistered: boolean }> {
    return this.http.post<{ isRegistered: boolean }>(
      `${this.apiUrl}/auth/check-email`,
      {
        email,
      }
    );
  }

  saveAuthState(idToken: string): void {
    localStorage.setItem('idToken', idToken);
  }

  isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('idToken');

      if (!token) {
        return false;
      }

      const decodedToken = jwtDecode(token);

      const isTokenExpired = decodedToken.exp
        ? decodedToken.exp * 1000 < Date.now()
        : true;

      return !isTokenExpired;
    } catch (error) {
      return false;
    }
  }

  clearAuthState(): void {
    localStorage.removeItem('idToken');
  }
}
