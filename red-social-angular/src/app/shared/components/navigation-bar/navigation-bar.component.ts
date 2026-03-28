import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,      // <-- FALTA ESTO
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  
  private router = inject(Router);

  items = [
    { label: 'Home',    icon: 'fas fa-home',    routerLink: '/' },
    { label: 'Posts',   icon: 'fas fa-pen',     routerLink: '/posts' },
    { label: 'buscar',   icon: 'fas fa-search',     routerLink: '/buscar' },
    { label: 'Profile', icon: 'fas fa-user',    routerLink: '/profile' },
    {label:'notifications', icon:'fas fa-bell', routerLink:'/notifications' }
  ];

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
