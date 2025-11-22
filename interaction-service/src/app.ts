import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db/connection';
import interactionRoutes from './routes/interaction.routes';
import { setupSwagger } from './config/swagger';
import './models/Like';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Setup Swagger
setupSwagger(app);

app.use('/api/interactions', interactionRoutes);

app.get('/', (_req, res) => {
  res.send('Interaction service funcionando correctamente');
});

app.listen(PORT, async () => {
  console.log(`🚀 Servidor Interaction iniciado en el puerto ${PORT}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Base de datos conectada y sincronizada');
  } catch (error) {
    console.error('❌ Error con la base de datos:', error);
  }
});
