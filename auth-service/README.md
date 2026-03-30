# Auth Service - Microservicio de Autenticación

## 📋 Descripción
Microservicio encargado de manejar **SOLO la autenticación** (login y generación de tokens JWT). **NO gestiona usuarios ni tiene base de datos propia**. Consulta al `user-service` para validar credenciales.

## 🏗️ Arquitectura

### ✅ Responsabilidades
- Login de usuarios
- Generación y validación de tokens JWT
- Refresh tokens
- **NO registra usuarios** (lo hace `user-service`)
- **NO almacena datos de usuarios** (solo consulta `user-service`)

### ❌ NO hace
- Registro de usuarios (usar `user-service`)
- CRUD de usuarios
- Gestión de perfiles
- Almacenamiento de datos de usuario

## 🏗️ Estructura del Proyecto

### 📁 Carpetas Principales

#### `/src` - Código Fuente
Contiene todo el código TypeScript del microservicio.

#### `/src/controllers/` - Controladores
- `authController.ts`: Solo maneja login

#### `/src/routes/` - Definición de Rutas
- `authRoutes.ts`: Solo ruta `/api/auth/login`

#### `/src/services/` - Servicios
- `authService.ts`: Consulta `user-service` con axios para validar credenciales

#### `/src/middlewares/` - Middlewares
- `auth.ts`: Middleware para validar tokens JWT

#### `/src/config/` - Configuraciones
- `swagger.ts`: Configuración de documentación API

## 🚀 Scripts Disponibles

```bash
npm run dev    # Ejecuta en modo desarrollo con hot-reload
npm run build  # Compila TypeScript a JavaScript
npm start      # Ejecuta la aplicación en producción
```

## 🔧 Variables de Entorno

Crear archivo `.env` con:
```env
PORT=3001
JWT_SECRET=tu_secreto_jwt
USER_SERVICE_URL=http://user-service:3002  # Docker
# USER_SERVICE_URL=http://localhost:3002   # Local
NODE_ENV=production  # production para Docker, development para local
```

## 📚 Endpoints Disponibles

- `POST /api/auth/login` - Iniciar sesión
- `GET /health` - Health check del servicio

## 🔄 Flujo de Login

```
Usuario
  │
  │ POST /api/auth/login { email, password }
  ▼
┌──────────────────────────┐
│   AUTH-SERVICE           │
│ 1. Recibe credenciales   │
│ 2. Consulta user-service │◄────┐
└────────┬─────────────────┘     │
         │                        │
         │ GET /api/users/by-email/:email
         ▼                        │
    ┌──────────────────────┐     │
    │   USER-SERVICE       │     │
    │ 3. Devuelve usuario  │─────┘
    │    con password      │
    └──────────────────────┘

AUTH-SERVICE
│ 4. Valida password con bcrypt
│ 5. Genera JWT
│ 6. Devuelve token + user data
▼
Usuario recibe token
```

## 🐳 Docker

```bash
# Construir imagen
docker build -t auth-service .

# Ejecutar contenedor
docker run -p 3001:3001 auth-service
```

## 🔍 Swagger Documentation

Una vez ejecutado el servicio, la documentación estará disponible en:
`http://localhost:3001/api-docs`

    