import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const initializeDatabase = async () => {
  const targetDb = process.env.DB_NAME || 'auth_db';
  const adminDb = process.env.DB_ADMIN_DB || 'postgres';

  const adminSequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: adminDb,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    dialect: 'postgres',
    logging: false,
  });

  try {
    await adminSequelize.authenticate();
  } catch (adminError: any) {
    const isDbMissing = /no existe la base de datos|does not exist/.test(adminError.message);
    if (isDbMissing && adminDb !== targetDb) {
      // Si el DB de administración no existe, intentamos conectar directamente al target (ya creado por el usuario).
      const targetSequelize = new Sequelize({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        database: targetDb,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        dialect: 'postgres',
        logging: false,
      });

      try {
        await targetSequelize.authenticate();
        console.log(`ℹ️  Base de datos ${targetDb} ya istnieje y está activa`);
        await targetSequelize.close();
        return;
      } catch (targetError: any) {
        console.error('❌ No se puede conectar al DB target:', targetError.message);
      } finally {
        await targetSequelize.close();
      }
    }

    console.error('❌ Error al conectar al DB de administración:', adminError.message);
    throw adminError;
  }

  try {
    const [results]: any = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${targetDb}'`
    );

    if (results.length === 0) {
      await adminSequelize.query(`CREATE DATABASE "${targetDb}"`);
      console.log(`✅ Base de datos ${targetDb} creada`);
    } else {
      console.log(`ℹ️  Base de datos ${targetDb} ya existe`);
    }
  } catch (error: any) {
    console.error('❌ Error al verificar/crear BD:', error.message);
    throw error;
  } finally {
    await adminSequelize.close();
  }
};

export const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'auth_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  dialect: 'postgres',
  logging: false,
});
