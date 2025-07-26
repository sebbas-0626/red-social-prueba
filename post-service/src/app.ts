import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db/connection';
import postRoutes from './routes/postRoutes';
import { setupSwagger } from './config/swagger';
import './models/Post';
import './models/Like';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Setup Swagger
setupSwagger(app);

app.use('/api/posts', postRoutes);

app.get('/', (_req, res) => {
  res.send('Post service funcionando correctamente');
});

app.listen(PORT, async () => {
  console.log(`🚀 Servidor Post iniciado en el puerto ${PORT}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Base de datos conectada y sincronizada');
  } catch (error) {
    console.error('❌ Error con la base de datos:', error);
  }
});