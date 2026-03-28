import { Routes } from '@angular/router';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/post-list/post-list.component').then(m => m.PostListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/post-create/post-create.component').then(m => m.PostCreateComponent),
  }
];
