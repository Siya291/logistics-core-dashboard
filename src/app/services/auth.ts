import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      tap((response) => {
        localStorage.setItem('jwt_token', response.token);
      }),
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }
}
