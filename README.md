# Red Social - Microservicios

aplicación de red social construida con arquitectura de microservicios usando Node.js, TypeScript, PostgreSQL y Vue.js.

## 🏗️ Arquitectura

El proyecto está dividido en los siguientes microservicios:

### Backend (Microservicios)
- **Auth Service** (Puerto 3001): Maneja autenticación y autorización de usuarios
- **User Service** (Puerto 3002): Gestiona perfiles y datos de usuarios
- **Post Service** (Puerto 3003): Administra publicaciones y contenido

### Frontend
- **Vue.js App** (Puerto 5173): Interfaz de usuario construida con Vue 3, TypeScript y Tailwind CSS

### Base de Datos
- **PostgreSQL** (Puerto 5435): Base de datos relacional compartida

## 🛠️ Tecnologías

### Backend
- Node.js + TypeScript
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT para autenticación
- bcryptjs para hash de contraseñas

### Frontend
- Vue 3 + TypeScript
- Vue Router
- Pinia (estado global)
- Tailwind CSS
- Axios (HTTP client)
- Vite (build tool)

## 📋 Prerrequisitos

### Para desarrollo local:
- Node.js (v18 o superior)
- npm o yarn
- PostgreSQL (v15 o superior)

### Para Docker:
- Docker
- Docker Compose

## 🚀 Ejecución Local

### 1. Configurar Base de Datos
```bash
# Instalar PostgreSQL y crear base de datos
createdb red_social
```

### 2. Configurar Variables de Entorno
Crear archivos `.env` en cada servicio:

**auth-service/.env:**
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=tu_password
JWT_SECRET=tu_jwt_secret
```

**user-service/.env:**
```env
PORT=3002
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=tu_password
JWT_SECRET=tu_jwt_secret
```

**post-service/.env:**
```env
PORT=3003
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=tu_password
JWT_SECRET=tu_jwt_secret
```

**red-social-vue/.env:**
```env
VITE_AUTH_SERVICE_URL=http://localhost:3001
VITE_USER_SERVICE_URL=http://localhost:3002
VITE_POST_SERVICE_URL=http://localhost:3003
```

### 3. Instalar Dependencias y Ejecutar

#### Auth Service
```bash
cd auth-service
npm install
npm run dev
```

#### User Service
```bash
cd user-service
npm install
npm run dev
```

#### Post Service
```bash
cd post-service
npm install
npm run dev
```

#### Frontend
```bash
cd red-social-vue
npm install
npm run dev
```

## 🐳 Ejecución con Docker

### 1. Construir y ejecutar todos los servicios
```bash
# Desde la raíz del proyecto
docker-compose up --build
```

### 2. Ejecutar en segundo plano
```bash
docker-compose up -d --build
```

### 3. Ver logs
```bash
# Todos los servicios
docker-compose logs -f

# Servicio específico
docker-compose logs -f auth-service
```

### 4. Detener servicios
```bash
docker-compose down
```

### 5. Limpiar volúmenes (eliminar datos)
```bash
docker-compose down -v
```

## 📡 Endpoints de API

### Auth Service (http://localhost:3001)
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

### User Service (http://localhost:3002)
- `GET /api/users/profile` - Obtener perfil del usuario
- `PUT /api/users/profile` - Actualizar perfil
- `GET /api/users/:id` - Obtener usuario por ID

### Post Service (http://localhost:3003)
- `GET /api/posts` - Obtener todas las publicaciones
- `POST /api/posts` - Crear nueva publicación
- `GET /api/posts/:id` - Obtener publicación por ID
- `PUT /api/posts/:id` - Actualizar publicación
- `DELETE /api/posts/:id` - Eliminar publicación

## 🌐 Acceso a la Aplicación

Una vez ejecutado (local o Docker):
- **Frontend**: http://localhost:5173
- **Auth Service**: http://localhost:3001
- **User Service**: http://localhost:3002
- **Post Service**: http://localhost:3003
- **PostgreSQL**: localhost:5435

## 🔧 Scripts Disponibles

### Backend Services
```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Compilar TypeScript
npm start        # Ejecutar versión compilada
```

### Frontend
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 📁 Estructura del Proyecto

```
red-social-backend/
├── auth-service/           # Servicio de autenticación
│   ├── src/
│   │   ├── controllers/    # Controladores
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Rutas de API
│   │   ├── middlewares/    # Middlewares
│   │   └── db/            # Configuración de BD
│   └── Dockerfile
├── user-service/          # Servicio de usuarios
├── post-service/          # Servicio de publicaciones
├── red-social-vue/        # Frontend Vue.js
│   ├── src/
│   │   ├── components/    # Componentes Vue
│   │   ├── views/         # Páginas/Vistas
│   │   ├── services/      # Servicios HTTP
│   │   └── router/        # Configuración de rutas
│   └── Dockerfile
├── docker-compose.yml     # Configuración Docker
└── init-db.sql           # Script inicial de BD
```

## 🐛 Troubleshooting

### Problemas comunes:

1. **Error de conexión a BD**: Verificar que PostgreSQL esté ejecutándose y las credenciales sean correctas
2. **Puerto ocupado**: Cambiar puertos en docker-compose.yml o archivos .env
3. **CORS errors**: Verificar configuración de CORS en los servicios backend
4. **JWT errors**: Asegurar que JWT_SECRET sea el mismo en todos los servicios

### Logs útiles:
```bash
# Ver logs de un servicio específico
docker-compose logs auth-service

# Ver logs en tiempo real
docker-compose logs -f
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.