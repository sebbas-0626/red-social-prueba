# Solución al Error de Conexión a Base de Datos en Docker

## Problemas Identificados

1. **Configuración incorrecta del host de la base de datos**: En los archivos `.env` de los servicios, el `DB_HOST` estaba configurado como `localhost`, pero en Docker, cada servicio debe conectarse al servicio de PostgreSQL usando el nombre del servicio en el docker-compose, que es `postgres`.

2. **Nombres de bases de datos inconsistentes**: Los nombres de las bases de datos en los archivos `.env` no coincidían exactamente con los creados en `init-db.sql`.

3. **Falta de volúmenes para archivos .env**: En el `docker-compose.yml`, faltaban los volúmenes para montar los archivos `.env` en los servicios de usuarios y publicaciones.

## Cambios Realizados

1. Se actualizaron los archivos `.env` de todos los servicios para usar `DB_HOST=postgres` en lugar de `localhost`.

2. Se corrigieron los nombres de las bases de datos en los archivos `.env` para que coincidan con los nombres en `init-db.sql`:
   - `auth_service` (correcto)
   - `user_service` (antes era `user-service`)
   - `post_service` (antes era `post-service`)

3. Se agregaron volúmenes en el `docker-compose.yml` para montar los archivos `.env` en los servicios de usuarios y publicaciones.

## Cómo Probar la Solución

1. Detén todos los contenedores en ejecución:
   ```bash
   docker-compose down
   ```

2. Elimina los volúmenes para asegurarte de que la base de datos se recree correctamente:
   ```bash
   docker-compose down -v
   ```

3. Reconstruye y ejecuta todos los servicios:
   ```bash
   docker-compose up --build
   ```

4. Verifica los logs para asegurarte de que no hay errores de conexión:
   ```bash
   docker-compose logs -f
   ```

## Nota Importante

Si necesitas alternar entre desarrollo local y Docker, puedes comentar/descomentar las líneas correspondientes en los archivos `.env`:

```env
# Para desarrollo local
# DB_HOST=localhost

# Para Docker
DB_HOST=postgres
```

## Solución de Problemas Adicionales

Si sigues experimentando problemas de conexión, verifica:

1. Que el servicio de PostgreSQL esté funcionando correctamente:
   ```bash
   docker-compose logs postgres
   ```

2. Que las bases de datos se hayan creado correctamente:
   ```bash
   docker-compose exec postgres psql -U postgres -c "\l"
   ```

3. Que los servicios estén intentando conectarse a las bases de datos correctas (revisa los logs de cada servicio).