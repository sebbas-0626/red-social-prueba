import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { MockAuthInterceptor } from './mock-auth.interceptor';

export const httpInterceptorProviders = [
  // Mock interceptor - DEBE IR PRIMERO para interceptar antes que los demás
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MockAuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
];
