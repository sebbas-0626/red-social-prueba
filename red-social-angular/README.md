# Red Social - Frontend Angular

## 📋 Descripción
Frontend de la aplicación de red social desarrollado en Angular 19 con Material Design.

## 🚀 Instalación y Ejecución

### Opción 1: Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

### Opción 2: Docker (Recomendado)

```bash
# Desde el directorio raíz del proyecto
docker-compose up --build frontend

# O para ejecutar todos los servicios
docker-compose up --build

# La aplicación estará disponible en http://localhost:80
```

### Opción 3: Solo Frontend con Docker

```bash
# Construir la imagen
docker build -t red-social-angular .

# Ejecutar el contenedor
docker run -p 80:80 red-social-angular
```

## 🔧 Configuración

### Variables de Entorno

El proyecto utiliza archivos de environment de Angular:

- `src/environments/environment.ts` - Configuración de desarrollo
- `src/environments/environment.prod.ts` - Configuración de producción

### URLs de Servicios

| Servicio | Puerto | URL |
|----------|--------|-----|
| Auth Service | 3001 | http://localhost:3001/api/auth |
| Posts Service | 3003 | http://localhost:3003/api/posts |
| Users Service | 3002 | http://localhost:3002/api/users |

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── auth/          # Componentes de autenticación
│   │   ├── posts/         # Componentes de posts
│   │   ├── profile/       # Componentes de perfil
│   │   └── shared/        # Componentes compartidos
│   ├── models/            # Modelos de datos
│   └── services/          # Servicios de API
├── environments/          # Configuración de entornos
└── assets/               # Recursos estáticos
```

## 🛠️ Scripts Disponibles

```bash
npm start          # Ejecutar en modo desarrollo
npm run build      # Construir para producción
npm run watch      # Construir en modo watch
npm test           # Ejecutar tests
```

## 🔒 Características de Seguridad

- ✅ Headers de seguridad configurados en nginx
- ✅ CORS configurado para desarrollo
- ✅ Validación de formularios
- ✅ Autenticación JWT
- ✅ Protección de rutas

## 📱 Características de la Aplicación

- ✅ Diseño responsive con Material Design
- ✅ Navegación SPA optimizada
- ✅ Gestión de estado con servicios
- ✅ Validación de formularios
- ✅ Paginación de posts
- ✅ Sistema de likes
- ✅ Perfiles de usuario
- ✅ Autenticación y registro

## 🐳 Configuración Docker

### Dockerfile
- Multi-stage build optimizado
- Construcción en Node.js 18
- Servido con nginx optimizado
- Configuración simplificada

### nginx.conf
- Configuración optimizada para SPA
- Compresión gzip habilitada
- Headers de seguridad
- Soporte para routing de Angular

## 🔍 Troubleshooting

### Problema: La aplicación no se conecta a los servicios backend
**Solución:** Verificar que los servicios backend estén ejecutándose y las URLs sean correctas.

### Problema: Errores de CORS
**Solución:** Los servicios backend deben tener CORS configurado para permitir requests desde el frontend.

### Problema: La aplicación no carga en Docker
**Solución:** Verificar que el puerto 80 esté disponible y no haya conflictos.

## 📝 Notas de Desarrollo

- La aplicación está configurada para usar Angular 19
- Material Design está integrado para la UI
- FontAwesome está incluido para iconos
- El proyecto usa TypeScript con configuración estricta
- Los tests usan Jasmine y Karma

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
