import { Component } from '@angular/core';

@Component({
	selector: 'app-navigation-bar',
	imports: [],
	templateUrl: './navigation-bar.component.html',
	styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

    items = [
        {                                                       
            label: 'Home',  
            routerLink: '/home'
        },
        {
            label: 'Posts',
            routerLink: '/posts'
        },
        {
            label: 'Profile',
            routerLink: '/profile'
        },
        {
            label: 'Logout',
            routerLink: '/logout'
        }
    ];

}
