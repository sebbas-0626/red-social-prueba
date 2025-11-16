import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockAuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercepta las peticiones de login
    if (req.url.includes('/auth/login')) {
      // Lee el email del body de la petición
      const requestBody = req.body as { email: string; password: string };
      
      const body = {
        message: 'Mock login exitoso',
        token: 'mock-token-789',
        user: {
          id: 99,
          username: 'mock_admin_sebastian',
          email: requestBody?.email || 'mock@test.com'
        }
      };

      return of(new HttpResponse({ status: 200, body }));
    }

    // Intercepta las peticiones de registro
    if (req.url.includes('/auth/register')) {
      const requestBody = req.body as { username: string; email: string; password: string };
      
      const body = {
        message: 'Mock registro exitoso',
        token: 'mock-token-register-123',
        user: {
          id: 100,
          username: requestBody?.username || 'mock_user',
          email: requestBody?.email || 'mock@test.com'
        }
      };

      return of(new HttpResponse({ status: 201, body }));
    }

    // Para cualquier otra petición, continúa normalmente
    return next.handle(req);
  }
}
