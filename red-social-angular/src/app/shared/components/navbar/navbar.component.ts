import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
	currentUser: User | null = null;

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.authService.currentUser$.subscribe(user => {
			this.currentUser = user;
		});
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
