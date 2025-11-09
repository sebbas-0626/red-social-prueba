import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db/connection';
import userRoutes from './routes/userRoutes';
import { setupSwagger } from './config/swagger';
import './models/User';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Setup Swagger
setupSwagger(app);

app.use('/api/users', userRoutes);

app.get('/', (_req, res) => {
  res.send('✅User service funcionando correctamente');
});

app.listen(PORT, async () => {
  console.log(`🚀 Servidor User iniciado en el puerto ${PORT}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Base de datos conectada y sincronizada');
  } catch (error) {
    console.error('❌ Error con la base de datos:', error);
  }
});