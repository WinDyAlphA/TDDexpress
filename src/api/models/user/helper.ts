import { User } from './user';
import { database } from '../../config/database';
import { v4 as uuidv4 } from 'uuid';

export namespace UserHelper {
    export const getAllUser = (): Array<User> => {
        try {
            const result = database.prepare('SELECT * FROM user').all();
            return result;
        } catch (error) {
            console.error('Erreur lors de la récupération des user :', error);
            return []; // Ou une autre action à prendre en cas d'erreur
        }
    }
    export const getUserById = (id: string): User | null => {
        try {
            const result = database.prepare('SELECT * FROM user WHERE id = ?').get(id);
            return result || null; // Retourne null si result est falsy (pas d'utilisateur trouvé)
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }
    export const createUser = (name: string): User | null => {
        const uuid = uuidv4();
        try {
            
            database.prepare('INSERT INTO user(id, name) VALUES(?, ?)').run(uuid, name);
            return getUserById(uuid);
        } catch (error) {
            console.error('Erreur lors de la création du user :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }

}