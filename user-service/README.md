# User Service - Microservicio de Gestión de Usuarios

## 📋 Descripción
Microservicio encargado de **gestionar completamente** los datos de usuarios en la red social. Es la **única fuente de verdad** para información de usuarios. Maneja registro, perfiles, y almacena las credenciales (incluido password).

## 🏗️ Arquitectura

### ✅ Responsabilidades
- **Registro de usuarios** (con password hasheado)
- CRUD completo de usuarios
- Gestión de perfiles (bio, avatar)
- Búsqueda de usuarios
- **Almacenamiento de passwords** (para que auth-service los consulte)
- Proveer datos de usuario a otros servicios

### 🔄 Interacción con Auth-Service
```
1. Usuario se registra → USER-SERVICE crea usuario con password
2. Usuario hace login → AUTH-SERVICE consulta USER-SERVICE
3. USER-SERVICE devuelve usuario con password
4. AUTH-SERVICE valida y genera token
```

## 🏗️ Estructura del Proyecto

### 📁 Carpetas Principales

#### `/src/controllers/` - Controladores
- `userController.ts`: Controla operaciones CRUD, registro, búsquedas

#### `/src/routes/` - Definición de Rutas
- `userRoutes.ts`: Rutas para `/api/users/*`

#### `/src/models/` - Modelos de Datos
- `User.ts`: Modelo completo de usuario (incluye password)

#### `/src/services/` - Servicios
- `userService.ts`: Lógica de negocio (registro, búsqueda, etc.)

#### `/src/middlewares/` - Middlewares
- `auth.ts`: Middleware para validar tokens JWT

#### `/src/config/` - Configuraciones
- `swagger.ts`: Configuración de documentación API

#### `/src/db/` - Base de Datos
- `connection.ts`: Configuración de Sequelize y conexión a PostgreSQL

## 🚀 Scripts Disponibles

```bash
npm run dev    # Ejecuta en modo desarrollo con hot-reload
npm run build  # Compila TypeScript a JavaScript
npm start      # Ejecuta la aplicación en producción
```

## 🔧 Variables de Entorno

Crear archivo `.env` con:
```env
PORT=3002
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=tu_secreto_jwt
NODE_ENV=development  # development para local, production para Docker
```

## 📚 Endpoints Disponibles

### Registro y Autenticación
- `POST /api/users/register` - **Registrar nuevo usuario** (público)
- `GET /api/users/by-email/:email` - Obtener usuario por email (interno, para auth-service)

### Perfiles de Usuario
- `GET /api/users/profile` - Obtener perfil del usuario autenticado (requiere token)
- `GET /api/users/profile/:id` - Obtener perfil público de usuario
- `PUT /api/users/profile` - Actualizar perfil (requiere token)

### Lista de Usuarios
- `GET /api/users/users/all` - Listar todos los usuarios

### Health Check
- `GET /health` - Verificar estado del servicio

### Endpoints que nos faltan 
```| Endpoint                      | Método | Público      | Descripción                                         |
| ----------------------------- | ------ | ------------ | --------------------------------------------------- |
| `/api/users/register`         | POST   | Sí           | Registrar un usuario (con password).                |
| `/api/users`                  | GET    | Sí           | Listar usuarios públicos.                           |
| `/api/users/:id`              | GET    | Sí           | Obtener perfil público.                             |
| `/api/users/profile`          | GET    | Requiere JWT | Obtener **mi** perfil.                              |
| `/api/users/profile`          | PUT    | Requiere JWT | Actualizar **mi** perfil.                           |
| `/api/users/by-email/:email`  | GET    | Interno      | Devuelve datos de login para auth-service.          |
| `/api/users/credentials`      | POST   | Interno      | Devuelve email + hash password.                     |
| `/api/users/create-from-auth` | POST   | Interno      | Crear usuario desde auth-service (raremente usado). |

```

## 🔄 Flujo de Registro

```
Usuario
  │
  │ POST /api/users/register
  │ { username, email, password }
  ▼
┌────────────────────────────┐
│   USER-SERVICE             │
│ 1. Valida datos            │
│ 2. Hashea password (bcrypt)│
│ 3. Crea usuario en DB      │
│ 4. Devuelve user (sin pwd) │
└────────────────────────────┘
  │
  ▼
Usuario registrado ✅
```

## 🔄 Flujo de Login (consulta desde auth-service)

```
AUTH-SERVICE
  │
  │ GET /api/users/by-email/:email
  ▼
┌────────────────────────────┐
│   USER-SERVICE             │
│ 1. Busca usuario por email │
│ 2. Devuelve usuario        │
│    CON password hasheado   │
└────────────────────────────┘
  │
  ▼
AUTH-SERVICE valida password
```

## 🗄️ Modelo de Usuario

```typescript
{
  id: number;
  username: string;
  email: string;
  password: string;        // ⭐ Hasheado con bcrypt
  bio?: string;
  avatar?: string;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🐳 Docker

```bash
# Construir imagen
docker build -t user-service .

# Ejecutar contenedor
docker run -p 3002:3002 user-service
```

## 🔍 Swagger Documentation

Una vez ejecutado el servicio, la documentación estará disponible en:
`http://localhost:3002/api-docs`

## 🔗 Comunicación con Otros Microservicios

Este microservicio es consultado por:
- **Auth Service**: Para validar credenciales en login
- **Post Service**: Para obtener información de autores de posts
- **Follow Service**: Para validar usuarios al seguir/dejar de seguir 