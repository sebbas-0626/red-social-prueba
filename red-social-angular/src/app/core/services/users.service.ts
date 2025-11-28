import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
//servicio para manejar las operaciones relacionadas con los usuarios
export class UsersService {
	private readonly API_URL = environment.usersServiceUrl;

	constructor(private http: HttpClient) { }

	getUserProfile(userId: string): Observable<User> {
		return this.http.get<User>(`${this.API_URL}/${userId}`);
	}

	updateProfile(userId: string, userData: Partial<User>): Observable<User> {
		return this.http.put<User>(`${this.API_URL}/${userId}`, userData);
	}
}
