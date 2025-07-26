import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Obtener la URL del servidor desde variables de entorno
const getServerUrl = (): string => {
  const port = process.env.PORT || '3001';
  const host = process.env.HOST || 'localhost';
  const protocol = process.env.PROTOCOL || 'http'; // Por defecto HTTP
  
  // Si hay una URL específica configurada, usarla
  if (process.env.SERVER_URL) {
    return process.env.SERVER_URL;
  }
  
  return `${protocol}://${host}:${port}`;
};

// Swagger definition
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'API documentation for the Auth Service',
    },
    servers: [
      {
        url: getServerUrl(),
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};