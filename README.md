# 🚀 Red Social - Microservicios + Angular

## 📋 Descripción
Aplicación de red social completa con arquitectura de microservicios y frontend Angular 19.

## 🏗️ Arquitectura

### Backend (Microservicios)
- **auth-service**: Autenticación y autorización (puerto 3001)
- **user-service**: Gestión de usuarios (puerto 3002)
- **post-service**: Gestión de posts y likes (puerto 3003)

### Frontend
- **red-social-angular**: Aplicación Angular (puerto 80)

### Base de Datos
- **PostgreSQL**: Base de datos principal (puerto 5435)

## 🚀 Instalación y Ejecución

### Opción 1: Docker Completo (Recomendado)
```bash
# Ejecutar toda la aplicación
docker-compose up --build

# Acceso: http://localhost:80
```

### Opción 2: Desarrollo Local
```bash
# Backend - Instalar dependencias de cada servicio
cd auth-service && npm install
cd ../user-service && npm install
cd ../post-service && npm install

# Frontend
cd ../red-social-angular && npm install && npm start

# Acceso: http://localhost:4200
```

### Opción 3: Docker Solo Frontend
```bash
cd red-social-angular
docker build -t red-social-angular .
docker run -p 80:80 red-social-angular
```

## 🌐 URLs de Acceso

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend Angular | http://localhost | 80 |
| Auth Service | http://localhost:3001 | 3001 |
| User Service | http://localhost:3002 | 3002 |
| Post Service | http://localhost:3003 | 3003 |
| PostgreSQL | localhost:5435 | 5435 |

## 🔧 Configuración

### Variables de Entorno
Los servicios utilizan las siguientes variables de entorno:

```bash
# Base de datos
DB_HOST=postgres
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=postgres

# Servicios
NODE_ENV=production
```

### URLs de Servicios (Frontend)
- **Desarrollo**: localhost:3001, localhost:3002, localhost:3003
- **Docker**: auth-service:3001, user-service:3002, post-service:3003

## 📁 Estructura del Proyecto

```
red-social-backend/
├── auth-service/          # Servicio de autenticación
├── user-service/          # Servicio de usuarios
├── post-service/          # Servicio de posts
├── red-social-angular/    # Frontend Angular
├── docker-compose.yml     # Configuración Docker
└── init-db.sql          # Script de inicialización BD
```

## 🛠️ Comandos Útiles

### Docker
```bash
# Ejecutar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose build --no-cache
```

### Desarrollo
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Construir para producción
npm run build
```

## 🔒 Características de Seguridad

- ✅ Autenticación JWT
- ✅ Validación de formularios
- ✅ Headers de seguridad en nginx
- ✅ CORS configurado
- ✅ Protección de rutas

## 📱 Funcionalidades

- ✅ Registro e inicio de sesión
- ✅ Crear y ver posts
- ✅ Sistema de likes
- ✅ Perfiles de usuario
- ✅ Diseño responsive
- ✅ Navegación SPA

## 🐛 Troubleshooting

### Problema: "Cannot connect to backend services"
**Solución:** Verificar que los servicios backend estén ejecutándose.

### Problema: "CORS errors"
**Solución:** Los servicios backend deben tener CORS configurado.

### Problema: "Port 80 already in use"
**Solución:** Cambiar el puerto en docker-compose.yml.

### Problema: "Database connection failed"
**Solución:** Verificar que PostgreSQL esté ejecutándose y las credenciales sean correctas.

## 📝 Notas de Desarrollo

- La aplicación usa Angular 19
- Los microservicios están en Node.js/TypeScript
- PostgreSQL como base de datos principal
- Docker para containerización
- nginx para servir el frontend
