# Red Social Backend - Arquitectura de Microservicios

## 📋 Descripción General
Sistema de red social construido con arquitectura de microservicios usando Node.js, TypeScript, Express y PostgreSQL. Cada microservicio maneja una funcionalidad específica y se comunica con otros a través de APIs REST.

## 🏗️ Arquitectura del Sistema

### 📊 Diagrama de Microservicios
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │   User Service  │    │   Post Service  │
│   (Puerto 3001) │    │   (Puerto 3002) │    │   (Puerto 3003) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   Database      │
                    └─────────────────┘
```

## 🚀 Microservicios

### 1. **Auth Service** (`auth-service/`)
- **Puerto**: 3001
- **Función**: Autenticación y autorización
- **Endpoints**: Registro, login, verificación de tokens JWT
- **Base de datos**: Tabla `users`

### 2. **User Service** (`user-service/`)
- **Puerto**: 3002
- **Función**: Gestión de perfiles de usuario
- **Endpoints**: Perfiles, búsqueda de usuarios, relaciones
- **Base de datos**: Extensión de tabla `users`

### 3. **Post Service** (`post-service/`)
- **Puerto**: 3003
- **Función**: Gestión de publicaciones
- **Endpoints**: Posts, likes, comentarios
- **Base de datos**: Tablas `posts`, `likes`

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js**: Runtime de JavaScript
- **TypeScript**: Lenguaje tipado
- **Express**: Framework web
- **Sequelize**: ORM para PostgreSQL
- **JWT**: Autenticación con tokens
- **Swagger**: Documentación de APIs

### Base de Datos
- **PostgreSQL**: Base de datos relacional
- **Docker**: Contenedores para desarrollo

### Frontend
- **Vue.js 3**: Framework frontend
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework CSS
- **Vite**: Build tool

## 📁 Estructura del Proyecto

```
red-social-backend/
├── auth-service/          # Microservicio de autenticación
│   ├── src/
│   │   ├── controllers/   # Lógica de negocio
│   │   ├── routes/        # Definición de endpoints
│   │   ├── models/        # Modelos de datos
│   │   ├── middlewares/   # Funciones intermedias
│   │   ├── config/        # Configuraciones
│   │   └── db/           # Conexión a base de datos
│   ├── dist/             # Código compilado
│   └── README.md         # Documentación específica
├── user-service/         # Microservicio de usuarios
├── post-service/         # Microservicio de posts
├── red-social-vue/       # Frontend en Vue.js
├── docker-compose.yml    # Orquestación de contenedores
└── README.md            # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18+)
- Docker y Docker Compose
- PostgreSQL

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd red-social-backend
```

### 2. Configurar variables de entorno
Crear archivos `.env` en cada microservicio:

**auth-service/.env**
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=tu_secreto_jwt
```

**user-service/.env**
```env
PORT=3002
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=tu_secreto_jwt
```

**post-service/.env**
```env
PORT=3003
DB_HOST=localhost
DB_PORT=5432
DB_NAME=red_social
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=tu_secreto_jwt
```

### 3. Instalar dependencias
```bash
# Instalar en cada microservicio
cd auth-service && npm install
cd ../user-service && npm install
cd ../post-service && npm install
cd ../red-social-vue && npm install
```

### 4. Configurar base de datos
```bash
# Ejecutar script de inicialización
psql -U postgres -d red_social -f init-db.sql
```

### 5. Compilar microservicios
```bash
cd auth-service && npm run build
cd ../user-service && npm run build
cd ../post-service && npm run build
```

## 🐳 Ejecución con Docker

### Opción 1: Todos los servicios
```bash
docker-compose up -d
```

### Opción 2: Servicios individuales
```bash
# Auth Service
cd auth-service
docker build -t auth-service .
docker run -p 3001:3001 auth-service

# User Service
cd user-service
docker build -t user-service .
docker run -p 3002:3002 user-service

# Post Service
cd post-service
docker build -t post-service .
docker run -p 3003:3003 post-service
```

## 🛑 Comandos Docker Esenciales

### Detener Contenedores

#### `docker stop` - Terminación Suave (Recomendado)
```bash
# Detener un contenedor específico
docker stop auth-service

# Detener múltiples contenedores
docker stop auth-service user-service post-service

# Con tiempo personalizado (30 segundos)
docker stop --time=30 auth-service
```

**¿Cómo funciona?**
1. **SIGTERM**: Envía señal de terminación suave al proceso principal
2. **Espera**: Aguarda 10 segundos por defecto para cierre graceful
3. **SIGKILL**: Si no responde, fuerza la terminación

#### `docker kill` - Terminación Forzada
```bash
# Solo usar en emergencias
docker kill auth-service
```

#### `docker-compose stop` - Múltiples Servicios
```bash
# Detener todos los servicios
docker-compose stop

# Detener servicios específicos
docker-compose stop auth-service user-service
```

### Otros Comandos Útiles

```bash
# Ver contenedores en ejecución
docker ps

# Ver todos los contenedores (incluyendo detenidos)
docker ps -a

# Reiniciar contenedor detenido
docker start auth-service

# Eliminar contenedor detenido
docker rm auth-service

# Ver logs en tiempo real
docker logs -f auth-service
```

### 🚀 Iniciar Contenedores

#### `docker start` - Iniciar Contenedor Existente
```bash
# Iniciar un contenedor detenido
docker start auth-service

# Iniciar múltiples contenedores
docker start auth-service user-service post-service

# Iniciar en modo detached (segundo plano)
docker start -d auth-service

# Iniciar con configuración interactiva
docker start -i auth-service
```

**¿Cómo funciona?**
1. **Verifica estado**: Comprueba que el contenedor existe y está detenido
2. **Restaura configuración**: Aplica la configuración original del contenedor
3. **Ejecuta comando**: Ejecuta el CMD/ENTRYPOINT del Dockerfile
4. **Mantiene datos**: Preserva todos los datos y cambios del contenedor

#### Diferencias importantes:
- **`docker run`**: Crea un contenedor NUEVO desde una imagen
- **`docker start`**: Inicia un contenedor EXISTENTE que estaba detenido

#### `docker-compose start` - Múltiples Servicios
```bash
# Iniciar todos los servicios
docker-compose start

# Iniciar servicios específicos
docker-compose start auth-service user-service
```

### 🔄 Reiniciar Contenedores

```bash
# Reiniciar un contenedor en ejecución
docker restart auth-service

# Reiniciar con tiempo de espera
docker restart --time=30 auth-service

# Reiniciar múltiples contenedores
docker restart auth-service user-service post-service

# Reiniciar todos los servicios
docker-compose restart
```

## 🚀 Ejecución en Desarrollo

### Microservicios Backend
```bash
# Terminal 1 - Auth Service
cd auth-service
npm run dev

# Terminal 2 - User Service
cd user-service
npm run dev

# Terminal 3 - Post Service
cd post-service
npm run dev
```

### Frontend
```bash
cd red-social-vue
npm run dev
```

## 📚 APIs y Documentación

### Endpoints Principales

#### Auth Service (http://localhost:3001)
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token

#### User Service (http://localhost:3002)
- `GET /api/users/profile/:id` - Obtener perfil
- `PUT /api/users/profile/:id` - Actualizar perfil
- `GET /api/users/search` - Buscar usuarios

#### Post Service (http://localhost:3003)
- `POST /api/posts` - Crear post
- `GET /api/posts` - Obtener posts
- `POST /api/posts/:id/like` - Dar like

### Documentación Swagger
- Auth Service: http://localhost:3001/api-docs
- User Service: http://localhost:3002/api-docs
- Post Service: http://localhost:3003/api-docs

## 🔧 Scripts Útiles

### Desarrollo
```bash
# Compilar todos los microservicios
npm run build:all

# Ejecutar en modo desarrollo
npm run dev:all
```

### Docker
```bash
# Construir todas las imágenes
docker-compose build

# Ejecutar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## 🧪 Testing

```bash
# Ejecutar tests en cada microservicio
cd auth-service && npm test
cd ../user-service && npm test
cd ../post-service && npm test
```

## 📊 Monitoreo y Logs

### Health Checks
- Auth Service: http://localhost:3001/
- User Service: http://localhost:3002/
- Post Service: http://localhost:3003/

### Logs
```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f auth-service
```

## 🔒 Seguridad

- **JWT**: Autenticación con tokens
- **CORS**: Configurado para desarrollo
- **Validación**: Middleware de validación en cada servicio
- **Variables de entorno**: Configuración segura

## 📈 Escalabilidad

- **Arquitectura de microservicios**: Escalado independiente
- **Docker**: Contenedores aislados
- **Base de datos**: PostgreSQL optimizado
- **Load Balancing**: Preparado para balanceadores

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación de cada microservicio