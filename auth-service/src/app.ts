import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db/connection';
import authRoutes from './routes/authRoutes';
import { setupSwagger } from './config/swagger';

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
  console.log(`🚀 Servidor Auth iniciado en el puerto ${PORT}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Base de datos conectada y sincronizada');
  } catch (error) {
    console.error('❌ Error con la base de datos:', error);
  }
});