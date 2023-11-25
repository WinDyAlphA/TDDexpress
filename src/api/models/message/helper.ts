import { Message } from './message';
import { database } from '../../config/database';
import { v4 as uuidv4 } from 'uuid';

export namespace MessageHelper {
    export const getAllMessage = (): Array<Message> => {
        try {
            const result = database.prepare('SELECT * FROM message').all();
            return result;
        } catch (error) {
            console.error('Erreur lors de la récupération des message :', error);
            return []; // Ou une autre action à prendre en cas d'erreur
        }
    }
    export const getMessageById = (message_id: string): Message | null => {
        try {
            const result = database.prepare('SELECT * FROM message WHERE message_id = ?').get(message_id);
            return result || null; // Retourne null si result est falsy (pas d'utilisateur trouvé)
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }
    export const createMessage = (content: string): Message | null => {
        const uuid = uuidv4();
        const timestamp = Date.now()
        try {
            
            database.prepare('INSERT INTO message(message_id, content, timestamp) VALUES(?, ?, ?)').run(uuid, content,timestamp);
            return getMessageById(uuid);
        } catch (error) {
            console.error('Erreur lors de la création du message :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }

}