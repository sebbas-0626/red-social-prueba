# Post Service - Microservicio de Gestión de Posts

## 📋 Descripción
Microservicio encargado de gestionar las publicaciones (posts) en la red social. Proporciona endpoints para crear, leer, actualizar y eliminar posts, así como gestionar likes y comentarios.

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
  - Configurar rutas de posts
  - Iniciar el servidor en el puerto 3003

#### `/src/controllers/` - Controladores
- **Función**: Maneja la lógica de negocio de cada endpoint
- **Archivos**:
  - `postController.ts`: Controla operaciones CRUD de posts, likes y comentarios

#### `/src/routes/` - Definición de Rutas
- **Función**: Define los endpoints de la API de posts
- **Archivos**:
  - `postRoutes.ts`: Define rutas para `/api/posts/*` (CRUD de posts, likes, comentarios)

#### `/src/models/` - Modelos de Datos
- **Función**: Define la estructura de datos y relaciones con la base de datos
- **Archivos**:
  - `Post.ts`: Modelo de post con Sequelize
  - `Like.ts`: Modelo de like con relaciones a posts y usuarios

#### `/src/services/` - Servicios de Negocio
- **Función**: Contiene lógica de negocio reutilizable
- **Archivos**:
  - `postServices.ts`: Servicios para operaciones complejas de posts

#### `/src/types/` - Tipos TypeScript
- **Función**: Define interfaces y tipos personalizados
- **Archivos**:
  - `post.model.ts`: Interfaces para tipos de datos de posts

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
PORT=3003
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=tu_secreto_jwt
```

## 📚 Endpoints Disponibles

### Gestión de Posts
- `POST /api/posts` - Crear nuevo post
- `GET /api/posts` - Obtener posts (con paginación y filtros)
- `GET /api/posts/:id` - Obtener post específico
- `PUT /api/posts/:id` - Actualizar post
- `DELETE /api/posts/:id` - Eliminar post

### Posts de Usuario
- `GET /api/posts/user/:userId` - Obtener posts de un usuario específico
- `GET /api/posts/feed` - Obtener feed de posts (posts de usuarios seguidos)

### Sistema de Likes
- `POST /api/posts/:id/like` - Dar like a un post
- `DELETE /api/posts/:id/like` - Quitar like de un post
- `GET /api/posts/:id/likes` - Obtener likes de un post

### Comentarios
- `POST /api/posts/:id/comments` - Crear comentario
- `GET /api/posts/:id/comments` - Obtener comentarios de un post
- `PUT /api/posts/:id/comments/:commentId` - Actualizar comentario
- `DELETE /api/posts/:id/comments/:commentId` - Eliminar comentario

### Health Check
- `GET /` - Verificar estado del servicio

## 🐳 Docker

```bash
# Construir imagen
docker build -t post-service .

# Ejecutar contenedor
docker run -p 3003:3003 post-service
```

## 🔍 Swagger Documentation

Una vez ejecutado el servicio, la documentación estará disponible en:
`http://localhost:3003/api-docs`

## 🔗 Comunicación con Otros Microservicios

Este microservicio se comunica con:
- **Auth Service**: Para validar tokens JWT
- **User Service**: Para obtener información de usuarios que crean posts

## 📊 Funcionalidades Principales

1. **CRUD de Posts**: Crear, leer, actualizar y eliminar publicaciones
2. **Sistema de Likes**: Gestionar likes en posts
3. **Sistema de Comentarios**: Comentar en posts
4. **Feed de Posts**: Mostrar posts de usuarios seguidos
5. **Búsqueda y Filtros**: Buscar posts por contenido, usuario, fecha
6. **Paginación**: Cargar posts de forma paginada
7. **Validación de Autorización**: Verificar permisos para operaciones
8. **Documentación API**: Swagger integrado para testing

## 🗄️ Modelos de Datos

### Post
- `id`: Identificador único
- `content`: Contenido del post
- `userId`: ID del usuario que creó el post
- `imageUrl`: URL de imagen (opcional)
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

### Like
- `id`: Identificador único
- `postId`: ID del post
- `userId`: ID del usuario que dio like
- `createdAt`: Fecha del like 