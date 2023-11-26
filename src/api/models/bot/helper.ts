import { Bot } from './bot';
import { pool } from '../../config/database';
import { v4 as uuid4 } from 'uuid';

export namespace BotHelper {
    export const getAllBot = async (): Promise<Array<Bot>> => {
        try {
            const result = await pool.query('SELECT * FROM bot', []);
            return result.rows;
        } catch (error) {
            console.error('Error when retrieving all bots :', error);
            return []; // Ou une autre action à prendre en cas d'erreur
        }
    }

    export const getBotById = async (character_id: string): Promise<Bot | null> => {
        try {
            const result = await pool.query('SELECT * FROM bot WHERE character_id = $1', [character_id]);
            return result.rows[0] || null; // Retourne null si result est falsy (pas d'utilisateur trouvé)
        } catch (error) {
            console.error('Error when retrieving bot from id :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }

    export const createBot = async (name: string, image: string, description: string): Promise<Bot | null> => {
        const uuid = uuid4();
        try {
            await pool.query('INSERT INTO bot(character_id, name, image, description, id_fine_tuning) VALUES($1, $2, $3, $4, $5)', [uuid, name, image, description, ""]);
            return getBotById(uuid);
        } catch (error) {
            console.error('Error when creating bot :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }
}

