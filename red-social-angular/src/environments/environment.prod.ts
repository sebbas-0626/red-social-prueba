export const environment = {
  production: true,
  // URLs de los servicios backend para Docker (accesibles desde el navegador)
  authServiceUrl: 'http://localhost:3001/api/auth',
  postsServiceUrl: 'http://localhost:3003/api/posts',
  usersServiceUrl: 'http://localhost:3002/api/users',
  
  // Configuración de la aplicación
  appName: 'Red Social',
  appVersion: '1.0.0',
  
  // Configuración de paginación
  postsPerPage: 10,
  
  // Configuración de timeout
  requestTimeout: 30000,
  
  // Configuración de validación
  minPasswordLength: 6,
  maxPostLength: 1000,
  
  // Configuración de almacenamiento
  tokenKey: 'auth_token',
  userKey: 'user_data'
}; 