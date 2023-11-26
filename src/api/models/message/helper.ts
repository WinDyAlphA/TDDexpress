import { Message } from './message';
import { pool } from '../../config/database';
import { v4 as uuid4 } from 'uuid';

export namespace MessageHelper {
    export const getAllMessage = async (): Promise<Array<Message>> => {
        try {
            const result = await pool.query('SELECT * FROM message', []);
            return result.rows;
        } catch (error) {
            console.error('Error when retrieving all messages :', error);
            return []; // Ou une autre action à prendre en cas d'erreur
        }
    }

    export const getMessageById = async (message_id: string): Promise<Message | null> => {
        try {
            const result = await pool.query('SELECT * FROM message WHERE message_id = $1', [message_id]);
            return result.rows[0] || null; // Retourne null si result est falsy (pas d'utilisateur trouvé)
        } catch (error) {
            console.error('Error when retrieving message from id :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }

    export const createMessage = async (content: string): Promise<Message | null> => {
        const uuid = uuid4();
        const timestamp = Date.now();
        try {
            await pool.query('INSERT INTO message(message_id, content, timestamp) VALUES($1, $2, $3)', [uuid, content, timestamp]);
            return getMessageById(uuid);
        } catch (error) {
            console.error('Error when creating message :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }


}