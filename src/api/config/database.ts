import { config } from "dotenv";
import { Pool } from "pg";
config(); // Charge les variables d'environnement à partir du fichier .env

let pool: Pool;

const connectionDB = async (): Promise<void> => {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await loadDatabase();
};


const loadDatabase = async (): Promise<void> => {
  let client;
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS dmd_user
        (user_id VARCHAR(255) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL)
      `);
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS message
        (message_id VARCHAR(255) PRIMARY KEY NOT NULL, content TEXT NOT NULL, timestamp BIGINT)
      `);
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS bot
        (character_id VARCHAR(255) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL, image TEXT, description TEXT, id_fine_tuning VARCHAR(255))
      `);
    } finally {
      if (client) {
        client.release(); // Assurez-vous de libérer la connexion même en cas d'erreur.
      }
    }
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
  }
  
};




export { connectionDB, pool };
