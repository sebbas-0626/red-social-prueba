# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Construir la aplicación
RUN npm run build -- --configuration=production

# Depuración: mostrar contenido del build
RUN ls -l /app/dist/red-social-angular

# Etapa de producción con nginx
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos Angular construidos
COPY --from=builder /app/dist/red-social-angular/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
