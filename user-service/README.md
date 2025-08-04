# User Service - Microservicio de Gestión de Usuarios

## 📋 Descripción
Microservicio encargado de gestionar la información de usuarios en la red social. Proporciona endpoints para obtener perfiles, actualizar información de usuario, buscar usuarios y gestionar relaciones entre usuarios.

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
  - Configurar rutas de usuarios
  - Iniciar el servidor en el puerto 3002

#### `/src/controllers/` - Controladores
- **Función**: Maneja la lógica de negocio de cada endpoint
- **Archivos**:
  - `userController.ts`: Controla operaciones CRUD de usuarios, búsquedas y gestión de perfiles

#### `/src/routes/` - Definición de Rutas
- **Función**: Define los endpoints de la API de usuarios
- **Archivos**:
  - `userRoutes.ts`: Define rutas para `/api/users/*` (perfiles, búsquedas, actualizaciones)

#### `/src/models/` - Modelos de Datos
- **Función**: Define la estructura de datos y relaciones con la base de datos
- **Archivos**:
  - `User.ts`: Modelo de usuario con Sequelize (extendido del auth-service)

#### `/src/middlewares/` - Middlewares
- **Función**: Funciones que se ejecutan entre la petición y la respuesta
- **Archivos**:
  - `auth.ts`: Middleware para validar tokens JWT y autorización

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
```

## 📚 Endpoints Disponibles

### Perfiles de Usuario
- `GET /api/users/profile/:id` - Obtener perfil de usuario
- `PUT /api/users/profile/:id` - Actualizar perfil de usuario
- `GET /api/users/profile` - Obtener perfil del usuario autenticado

### Búsqueda de Usuarios
- `GET /api/users/search` - Buscar usuarios por nombre
- `GET /api/users` - Listar usuarios (con paginación)

### Gestión de Usuarios
- `DELETE /api/users/:id` - Eliminar usuario
- `GET /api/users/:id/followers` - Obtener seguidores
- `GET /api/users/:id/following` - Obtener usuarios seguidos

### Health Check
- `GET /` - Verificar estado del servicio

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

Este microservicio se comunica con:
- **Auth Service**: Para validar tokens JWT
- **Post Service**: Para obtener información de posts de usuarios

## 📊 Funcionalidades Principales

1. **Gestión de Perfiles**: Actualizar información personal, avatar, bio
2. **Búsqueda de Usuarios**: Buscar usuarios por nombre o username
3. **Sistema de Seguidores**: Gestionar relaciones entre usuarios
4. **Validación de Autorización**: Verificar permisos para operaciones
5. **Documentación API**: Swagger integrado para testing 