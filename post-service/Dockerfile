# ─── Builder Stage ─────────────────────────────────────────────────────────
FROM node:lts-alpine3.21 AS builder
WORKDIR /app

# 1) Copiamos lockfile + package.json e instalamos TODO (incluyendo @types)
COPY package*.json ./
RUN npm ci

# 2) Copiamos el código y compilamos con tsc
COPY . .
RUN npm run build

# ─── Runtime Stage ─────────────────────────────────────────────────────────
FROM node:lts-alpine3.21
WORKDIR /app

# 3) Sólo instalamos producción
COPY package*.json ./
RUN npm ci --only=production

# 4) Traemos la carpeta dist del builder
COPY --from=builder /app/dist ./dist

EXPOSE 3003
CMD ["npm", "start"]
