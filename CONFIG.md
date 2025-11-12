# Configuración de Entornos

Este proyecto soporta múltiples configuraciones para desarrollo local y Docker.

## 📁 Archivos de Configuración

Cada servicio tiene tres archivos de configuración:

```
auth-service/
  .env          # Configuración activa (Git ignored)
  .env.local    # Template para desarrollo local
  .env.docker   # Template para Docker
```

## 🔧 Configuración para Desarrollo Local

### 1. Copiar el archivo de configuración local:

```bash
# Auth Service
cp auth-service/.env.local auth-service/.env

# User Service  
cp user-service/.env.local user-service/.env

# Post Service (si lo tienes)
cp post-service/.env.local post-service/.env
```

### 2. Características de `.env.local`:
- `NODE_ENV=development`
- `DB_HOST=localhost`
- `DB_PORT=5435` (puerto mapeado de Docker)
- `USER_SERVICE_URL=http://localhost:3002`
- Los servicios se comunican por `localhost`

### 3. Ejecutar servicios:

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

---

## 🐳 Configuración para Docker

### 1. Copiar el archivo de configuración Docker:

```bash
# Auth Service
cp auth-service/.env.docker auth-service/.env

# User Service
cp user-service/.env.docker user-service/.env

# Post Service
cp post-service/.env.docker post-service/.env
```

### 2. Características de `.env.docker`:
- `NODE_ENV=production`
- `DB_HOST=postgres` (nombre del contenedor)
- `DB_PORT=5432` (puerto interno de Docker)
- `USER_SERVICE_URL=http://user-service:3002`
- Los servicios se comunican por nombres de contenedores

### 3. Ejecutar con Docker Compose:

```bash
docker-compose up --build
```

---

## 🔄 Auto-detección de Entorno

El código detecta automáticamente el entorno:

```typescript
// En userServiceIntegration.ts
const isDocker = process.env.NODE_ENV === 'production' || process.env.DOCKER === 'true';
const USER_SERVICE_URL = isDocker 
    ? 'http://user-service:3002'   // Docker
    : 'http://localhost:3002';      // Local
```

### Logs al iniciar:
```
🔗 User Service URL configurada: http://localhost:3002 (Local)
```
o
```
🔗 User Service URL configurada: http://user-service:3002 (Docker)
```

---

## ⚙️ Variables de Entorno

| Variable | Local | Docker | Descripción |
|----------|-------|--------|-------------|
| `NODE_ENV` | `development` | `production` | Entorno de ejecución |
| `DB_HOST` | `localhost` | `postgres` | Host de la base de datos |
| `DB_PORT` | `5435` | `5432` | Puerto de la base de datos |
| `USER_SERVICE_URL` | `http://localhost:3002` | `http://user-service:3002` | URL del user-service |

---

## 📝 Notas Importantes

1. **Nunca commitear `.env`**: Está en `.gitignore`
2. **DB_PORT en local**: Usa `5435` porque es el puerto mapeado en `docker-compose.yml`
3. **DB_PORT en Docker**: Usa `5432` porque es el puerto interno del contenedor
4. **Comunicación entre servicios**:
   - Local: `http://localhost:3002`
   - Docker: `http://user-service:3002` (nombre del servicio en docker-compose)

---

## 🚀 Inicio Rápido

### Desarrollo Local (Recomendado para desarrollo)
```bash
# 1. Copiar configuraciones
cp auth-service/.env.local auth-service/.env
cp user-service/.env.local user-service/.env
cp post-service/.env.local post-service/.env

# 2. Asegurarse que Postgres está corriendo
docker-compose up postgres -d

# 3. Ejecutar servicios
npm run dev # En cada carpeta de servicio
```

### Docker (Recomendado para producción/pruebas)
```bash
# 1. Copiar configuraciones
cp auth-service/.env.docker auth-service/.env
cp user-service/.env.docker user-service/.env
cp post-service/.env.docker post-service/.env

# 2. Levantar todo
docker-compose up --build
```

---

## ❓ Troubleshooting

### Error: "timeout connecting to user-service"
- ✅ Verifica que `NODE_ENV=development` en `.env` para desarrollo local
- ✅ Verifica que user-service esté corriendo en puerto 3002

### Error: "Connection refused to postgres"
- ✅ En local: Usa `DB_PORT=5435`
- ✅ En Docker: Usa `DB_PORT=5432`
- ✅ Verifica que Postgres esté corriendo: `docker ps | grep postgres`
