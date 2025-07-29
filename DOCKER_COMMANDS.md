# 🐳 Comandos Docker - Guía Completa

## 📋 Descripción
Esta guía contiene todos los comandos de Docker más útiles para trabajar con el proyecto de microservicios de red social. Incluye comandos para desarrollo, producción, debugging y mantenimiento.

## 🚀 Comandos Básicos

### 📦 Construir Imágenes

```bash
# Construir todas las imágenes del proyecto
docker-compose build

# Construir una imagen específica
docker build -t auth-service ./auth-service
docker build -t user-service ./user-service
docker build -t post-service ./post-service
docker build -t frontend ./red-social-vue

# Construir sin cache (forzar reconstrucción)
docker-compose build --no-cache

# Construir solo un servicio específico
docker-compose build auth-service
docker-compose build user-service
docker-compose build post-service
```

### 🏃‍♂️ Ejecutar Contenedores

```bash
# Ejecutar todos los servicios
docker-compose up

# Ejecutar en segundo plano (detached)
docker-compose up -d

# Ejecutar solo un servicio específico
docker-compose up auth-service
docker-compose up user-service
docker-compose up post-service

# Ejecutar con rebuild automático
docker-compose up --build

# Ejecutar solo algunos servicios
docker-compose up auth-service user-service
```

### 🛑 Detener Contenedores

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (datos de BD)
docker-compose down -v

# Detener y eliminar imágenes
docker-compose down --rmi all

# Detener un servicio específico
docker-compose stop auth-service

# Forzar detención (kill)
docker-compose kill
```

## 📊 Monitoreo y Logs

### 👀 Ver Logs

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs en tiempo real (follow)
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs auth-service
docker-compose logs user-service
docker-compose logs post-service

# Ver logs de los últimos N minutos
docker-compose logs --since="10m"

# Ver logs con timestamps
docker-compose logs -t

# Ver logs de múltiples servicios
docker-compose logs auth-service user-service
```

### 📈 Estado de Contenedores

```bash
# Ver estado de todos los contenedores
docker-compose ps

# Ver contenedores en ejecución
docker ps

# Ver todos los contenedores (incluyendo detenidos)
docker ps -a

# Ver información detallada de un contenedor
docker inspect auth-service
```

## 🔧 Desarrollo y Debugging

### 🐛 Entrar a Contenedores

```bash
# Entrar a un contenedor en ejecución
docker exec -it auth-service bash
docker exec -it user-service bash
docker exec -it post-service bash

# Entrar como root
docker exec -it --user root auth-service bash

# Ejecutar comando específico dentro del contenedor
docker exec -it auth-service npm run dev
docker exec -it user-service npm test
```

### 🔄 Reiniciar Servicios

```bash
# Reiniciar todos los servicios
docker-compose restart

# Reiniciar un servicio específico
docker-compose restart auth-service

# Reiniciar múltiples servicios
docker-compose restart auth-service user-service
```

### 🔍 Inspeccionar Contenedores

```bash
# Ver información detallada de un contenedor
docker inspect auth-service

# Ver logs de un contenedor específico
docker logs auth-service

# Ver logs en tiempo real
docker logs -f auth-service

# Ver uso de recursos
docker stats
```

## 🗄️ Base de Datos

### 📊 Comandos de PostgreSQL

```bash
# Conectar a la base de datos PostgreSQL
docker exec -it postgres psql -U postgres -d red_social

# Ejecutar script SQL
docker exec -i postgres psql -U postgres -d red_social < init-db.sql

# Hacer backup de la base de datos
docker exec postgres pg_dump -U postgres red_social > backup.sql

# Restaurar backup
docker exec -i postgres psql -U postgres -d red_social < backup.sql

# Ver logs de PostgreSQL
docker logs postgres
```

## 🧹 Limpieza y Mantenimiento

### 🗑️ Limpiar Recursos

```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes no utilizadas
docker image prune

# Eliminar volúmenes no utilizados
docker volume prune

# Eliminar redes no utilizadas
docker network prune

# Limpieza completa (cuidado: elimina todo)
docker system prune -a

# Eliminar contenedores específicos
docker rm auth-service user-service post-service
```

### 📦 Gestionar Imágenes

```bash
# Ver todas las imágenes
docker images

# Eliminar imagen específica
docker rmi auth-service

# Eliminar imágenes no utilizadas
docker image prune

# Forzar eliminación de imagen
docker rmi -f auth-service
```

## 🔧 Configuración Avanzada

### 🌐 Variables de Entorno

```bash
# Ejecutar con variables de entorno específicas
docker-compose --env-file .env.production up

# Ver variables de entorno de un contenedor
docker exec auth-service env

# Ejecutar con variables de entorno adicionales
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

### 🔗 Redes Docker

```bash
# Ver redes disponibles
docker network ls

# Crear red personalizada
docker network create red-social-network

# Conectar contenedor a red
docker network connect red-social-network auth-service

# Ver contenedores en una red
docker network inspect red-social-network
```

## 📋 Scripts Útiles

### 🚀 Scripts de Desarrollo

```bash
# Script para iniciar desarrollo completo
#!/bin/bash
echo "🚀 Iniciando desarrollo completo..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d
echo "✅ Servicios iniciados en:"
echo "   Auth Service: http://localhost:3001"
echo "   User Service: http://localhost:3002"
echo "   Post Service: http://localhost:3003"
echo "   Frontend: http://localhost:5173"
```

### 🔄 Script para Reiniciar Servicios

```bash
#!/bin/bash
echo "🔄 Reiniciando servicios..."
docker-compose restart
echo "✅ Servicios reiniciados"
```

### 🧹 Script de Limpieza

```bash
#!/bin/bash
echo "🧹 Limpiando recursos Docker..."
docker-compose down
docker system prune -f
echo "✅ Limpieza completada"
```

## 🐛 Troubleshooting

### ❌ Problemas Comunes

```bash
# Si los puertos están ocupados
docker-compose down
sudo lsof -i :3001 :3002 :3003 :5432
kill -9 <PID>

# Si hay problemas de permisos
sudo chown -R $USER:$USER .

# Si las imágenes están corruptas
docker-compose down
docker system prune -a
docker-compose build --no-cache

# Si la base de datos no responde
docker-compose restart postgres
docker logs postgres
```

### 🔍 Comandos de Debugging

```bash
# Ver uso de recursos en tiempo real
docker stats

# Ver información de red
docker network ls
docker network inspect red-social-backend_default

# Ver volúmenes
docker volume ls
docker volume inspect red-social-backend_postgres_data

# Ver información del sistema Docker
docker system df
docker info
```

## 📚 Comandos por Escenario

### 🎯 Desarrollo Local

```bash
# Iniciar solo los servicios necesarios
docker-compose up auth-service user-service

# Ejecutar con hot-reload
docker-compose up --build

# Ver logs en tiempo real
docker-compose logs -f auth-service user-service post-service
```

### 🏭 Producción

```bash
# Construir para producción
docker-compose -f docker-compose.prod.yml build

# Ejecutar en producción
docker-compose -f docker-compose.prod.yml up -d

# Verificar estado
docker-compose -f docker-compose.prod.yml ps
```

### 🧪 Testing

```bash
# Ejecutar tests en contenedor
docker exec auth-service npm test
docker exec user-service npm test
docker exec post-service npm test

# Ejecutar tests con coverage
docker exec auth-service npm run test:coverage
```

## 💡 Tips y Trucos

### ⚡ Comandos Rápidos

```bash
# Alias útiles (agregar a ~/.bashrc)
alias dcup='docker-compose up -d'
alias dcdown='docker-compose down'
alias dclogs='docker-compose logs -f'
alias dcps='docker-compose ps'
alias dcrestart='docker-compose restart'
```

### 🔄 Workflow Típico

```bash
# 1. Parar servicios
docker-compose down

# 2. Limpiar cache
docker system prune -f

# 3. Reconstruir imágenes
docker-compose build --no-cache

# 4. Iniciar servicios
docker-compose up -d

# 5. Ver logs
docker-compose logs -f
```

## 📖 Referencias

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**💡 Consejo**: Guarda este archivo como `DOCKER_COMMANDS.md` en la raíz de tu proyecto para tener acceso rápido a todos los comandos útiles. 