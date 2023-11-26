import { Bot } from './bot';
import { database } from '../../config/database';
import { v4 as uuid4 } from 'uuid';

export namespace BotHelper {
    export const getAllBot = (): Array<Bot> => {
        try {
            const result = database.prepare('SELECT * FROM bot').all();
            return result;
        } catch (error) {
            console.error('Error when retrieving all bots :', error);
            return []; // Ou une autre action à prendre en cas d'erreur
        }
    }
    export const getBotById = (character_id: string): Bot | null => {
        try {
            const result = database.prepare('SELECT * FROM bot WHERE character_id = ?').get(character_id);
            return result || null; // Retourne null si result est falsy (pas d'utilisateur trouvé)
        } catch (error) {
            console.error('Error when retrieving bot from id :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }
    export const createBot = (name: string, image: String, description: String): Bot | null => {
        const uuid = uuid4();
        try {
            database.prepare('INSERT INTO bot(character_id, name, image, description, id_fine_tuning) VALUES(?, ?, ?, ?, ?)').run(uuid, name, image, description, "");
            return getBotById(uuid);
        } catch (error) {
            console.error('Error when creating bot :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }
}

