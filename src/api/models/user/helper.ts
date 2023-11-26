import { User } from './user';
import { pool } from '../../config/database';
import { QueryResult } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export namespace UserHelper {
    export const getAllUser = async (): Promise<Array<User>> => {
        try {
            const result: QueryResult = await pool.query('SELECT * FROM dmd_user', []);
            return result.rows;
        } catch (error) {
            console.error('Erreur lors de la récupération des user :', error);
            return []; // Ou une autre action à prendre en cas d'erreur
        }
    }

    export const getUserById = async (user_id: string): Promise<User | null> => {
        try {
            const result: QueryResult = await pool.query('SELECT * FROM dmd_user WHERE user_id = $1', [user_id]);
            return result.rows[0] || null; // Retourne null si result est falsy (pas d'utilisateur trouvé)
        }
        catch (error) {
            console.error('Erreur lors de la récupération de l\'user :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }

    export const createUser = async (name: string): Promise<User | null> => {
        const uuid = uuidv4();
        try {
            await pool.query('INSERT INTO dmd_user(user_id, name) VALUES($1, $2)', [uuid, name]);
            return getUserById(uuid);
        } catch (error) {
            console.error('Erreur lors de la création de l\'user :', error);
            return null; // Ou une autre action à prendre en cas d'erreur
        }
    }


}
