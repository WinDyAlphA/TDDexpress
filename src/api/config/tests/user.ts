import { User } from "../../models/user/user";
import { Pool } from "pg";
import { pool } from "../database";

export const setupUserTable = async (payload: Array<User>): Promise<void> => {
    // Insérer des données de test avant les tests
    const testData = payload;
    try {
        const client = await pool.connect();
        try {
            for (const data of testData) {
                await client.query(
                    'INSERT INTO "dmd_user" (user_id, name) VALUES ($1, $2)',
                    [data.user_id, data.name]
                );
            }
            console.log('Données de test user insérées avec succès.');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données user de test :', error);
    }
};

export const teardownUserTable = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM "dmd_user"');
            console.log('Table user de test nettoyée avec succès.');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erreur lors du nettoyage de la base de données de test user :', error);
    }
};
