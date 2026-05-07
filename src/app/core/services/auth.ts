import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { appConfig } from '../config/app-config';
import { User } from '../models/user.model';

interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiUrl = `${appConfig.apiBaseUrl}/auth`;
  private readonly userStorageKey = 'blog_user';
  private readonly tokenStorageKey = 'blog_token';

  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(payload: { username: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload).pipe(tap((res) => this.saveSession(res)));
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload).pipe(tap((res) => this.saveSession(res)));
  }

  logout(): void {
    localStorage.removeItem(this.userStorageKey);
    localStorage.removeItem(this.tokenStorageKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private saveSession(response: AuthResponse): void {
    localStorage.setItem(this.userStorageKey, JSON.stringify(response.data.user));
    localStorage.setItem(this.tokenStorageKey, response.token);
    this.currentUserSubject.next(response.data.user);
  }

  private getStoredUser(): User | null {
    const savedUser = localStorage.getItem(this.userStorageKey);
    return savedUser ? (JSON.parse(savedUser) as User) : null;
  }
}
