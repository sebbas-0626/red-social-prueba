# Auth Service - Microservicio de Autenticación

## 📋 Descripción
Microservicio encargado de manejar la autenticación y autorización de usuarios en la red social. Proporciona endpoints para registro, login, y validación de tokens JWT.

## 🏗️ Estructura del Proyecto

### 📁 Carpetas Principales

#### `/src` - Código Fuente
Contiene todo el código TypeScript del microservicio.

#### `/dist` - Código Compilado
- **Función**: Contiene los archivos JavaScript compilados desde TypeScript
- **Generación**: Se crea automáticamente al ejecutar `npm run build`
- **Uso**: Node.js ejecuta estos archivos en producción

#### `/node_modules` - Dependencias
- **Función**: Contiene todas las librerías instaladas por npm
- **Generación**: Se crea al ejecutar `npm install`

### 📁 Estructura de `/src`

#### `/src/app.ts` - Punto de Entrada Principal
- **Función**: Archivo principal que inicia el servidor Express
- **Responsabilidades**:
  - Configurar middleware (CORS, JSON parsing)
  - Conectar a la base de datos
  - Configurar rutas
  - Iniciar el servidor en el puerto especificado

#### `/src/controllers/` - Controladores
- **Función**: Maneja la lógica de negocio de cada endpoint
- **Archivos**:
  - `authController.ts`: Controla registro, login y validación de usuarios

#### `/src/routes/` - Definición de Rutas
- **Función**: Define los endpoints de la API
- **Archivos**:
  - `authRoutes.ts`: Define rutas para `/api/auth/*`

#### `/src/models/` - Modelos de Datos
- **Función**: Define la estructura de datos y relaciones con la base de datos
- **Archivos**:
  - `User.ts`: Modelo de usuario con Sequelize

#### `/src/middlewares/` - Middlewares
- **Función**: Funciones que se ejecutan entre la petición y la respuesta
- **Archivos**:
  - `auth.ts`: Middleware para validar tokens JWT

#### `/src/config/` - Configuraciones
- **Función**: Archivos de configuración del microservicio
- **Archivos**:
  - `swagger.ts`: Configuración de documentación API

#### `/src/db/` - Base de Datos
- **Función**: Configuración y conexión a la base de datos
- **Archivos**:
  - `connection.ts`: Configuración de Sequelize y conexión a PostgreSQL

### 📄 Archivos de Configuración

#### `package.json`
- **Función**: Configuración del proyecto Node.js
- **Contiene**: Dependencias, scripts, metadatos del proyecto

#### `tsconfig.json`
- **Función**: Configuración del compilador de TypeScript
- **Define**: Versión de JavaScript, directorios de salida, opciones de compilación

#### `Dockerfile`
- **Función**: Instrucciones para crear imagen Docker del microservicio
- **Incluye**: Instalación de dependencias, compilación, configuración del contenedor

#### `.gitignore`
- **Función**: Define qué archivos NO se suben al repositorio Git
- **Excluye**: node_modules, dist, archivos de entorno

## 🚀 Scripts Disponibles local

```bash
npm run dev    # Ejecuta en modo desarrollo con hot-reload
npm run build  # Compila TypeScript a JavaScript
npm start      # Ejecuta la aplicación en producción
```

## 🔧 Variables de Entorno

Crear archivo `.env` con:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=tu_secreto_jwt
```

## 📚 Endpoints Disponibles

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token JWT
- `GET /` - Health check del servicio

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

##flujo auth-service - user-service

Usuario
  │
  │ POST /register
  ▼
┌──────────────────┐
│  AUTH-SERVICE    │ 1. Recibe registro
│                  │ 2. Crea en auth_db
│                  │ 3. Llama a user-service
└────────┬─────────┘
         │
         │ POST http://user-service:3002/api/users
         ▼
    ┌──────────────────┐
    │  USER-SERVICE    │ 4. Recibe notificación
    │                  │ 5. Crea perfil en user_db
    └──────────────────┘

## ahora 
Usuario registra
       ↓
┌──────────────────┐
│  AUTH-SERVICE    │ 1. Crea usuario en auth_db
│                  │ 2. Genera token
│                  │ 3. ⭐ Llama a USER-SERVICE ⭐
└────────┬─────────┘
         │
         │ POST http://user-service:3002/api/users
         │ Body: { userId, username, email }
         ▼
    ┌──────────────────┐
    │  USER-SERVICE    │ 4. Crea perfil en user_db
    └──────────────────┘

    