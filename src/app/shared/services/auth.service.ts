// src/app/shared/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RegisterDto { nombre:string; email:string; password:string; }
export interface LoginDto    { email:string;  password:string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** /api/security/auth */
  private readonly base = `${environment.apiRoot}/security/auth`;

  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<string> {
    return this.http.post(`${this.base}/register`, dto, { responseType: 'text' });
  }
  login(dto: LoginDto): Observable<string> {
    return this.http.post(`${this.base}/login`,    dto, { responseType: 'text' });
  }

  logout(): void   { localStorage.removeItem('isLoggedIn'); }
  isLoggedIn():boolean { return localStorage.getItem('isLoggedIn') === 'true'; }
}
