import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, initializeDatabase } from './db/connection';
import authRoutes from './routes/auth.routes';
import { setupSwagger } from './config/swagger';
import './models/refresh-token.model';
import './models/token-blacklist.model';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Setup Swagger
setupSwagger(app);

app.get('/', (_req, res) => {
  res.send('Auth service funcionando correctamente');
});

app.listen(PORT, async () => {
  console.log(`🚀 Auth Service iniciado en puerto ${PORT}`);
  console.log(`📝 Documentación: http://localhost:${PORT}/api-docs`);
  
  try {
    // Crear BD si no existe
    await initializeDatabase();
    
    // Conectar a la BD
    await sequelize.authenticate();
    console.log('✅ Conectado a auth_db');
    
    // Sincronizar modelos
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados (refresh_tokens, token_blacklist)');
  } catch (error) {
    console.error('❌ Error con la base de datos:', error);
  }
});
