import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly API_URL = environment.authServiceUrl;
	private currentUserSubject = new BehaviorSubject<User | null>(null);
	public currentUser$ = this.currentUserSubject.asObservable();
	isAuthenticatedSignal = signal(false);

	constructor(private http: HttpClient) {
		this.loadStoredUser();
	}

	private loadStoredUser(): void {
		const token = localStorage.getItem(environment.tokenKey);
		const user = localStorage.getItem(environment.userKey);
		if (token && user) {
			this.currentUserSubject.next(JSON.parse(user));
			this.isAuthenticatedSignal.set(true);
		} else {
			this.isAuthenticatedSignal.set(false);
		}
	}
	// This method is used to login a user

	login(credentials: LoginRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(
			`${this.API_URL}/login`,
			credentials
		).pipe(
			tap(response => {
				localStorage.setItem(environment.tokenKey, response.token);
				localStorage.setItem(environment.userKey, JSON.stringify(response.user));
				this.currentUserSubject.next(response.user);
				this.isAuthenticatedSignal.set(true);
			})
		);
	}

	// This method is used to register a new user
	register(userData: RegisterRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData)
			.pipe(
				tap(response => {
					localStorage.setItem(environment.tokenKey, response.token);
					localStorage.setItem(environment.userKey, JSON.stringify(response.user));
					this.currentUserSubject.next(response.user);
					this.isAuthenticatedSignal.set(true);
				})
			);
	}

	logout(): void {
		localStorage.removeItem(environment.tokenKey);
		localStorage.removeItem(environment.userKey);
		this.currentUserSubject.next(null);
		this.isAuthenticatedSignal.set(false);
	}

	getToken(): string | null {
		return localStorage.getItem(environment.tokenKey);
	}

	isAuthenticated(): boolean {
		return this.isAuthenticatedSignal();
	}

	getCurrentUser(): User | null {
		return this.currentUserSubject.value;
	}
}
