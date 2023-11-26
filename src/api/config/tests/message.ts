import { Message } from "../../models/message/message";
import { Pool, QueryResult } from "pg";
import { pool } from "../database";


export const setupMessageTable = async (payload: Array<Message>): Promise<void> => {
    // Insérer des données de test avant les tests
    const testData = payload;
    try {
        const client = await pool.connect();
        try {
            for (const data of testData) {
                await client.query(
                    'INSERT INTO message (message_id, content, timestamp) VALUES ($1, $2, $3)',
                    [data.message_id, data.content, data.timestamp]
                );
            }
            console.log('Données de test message insérées avec succès.');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données message de test :', error);
    }
};

export const teardownMessageTable = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM message');
            console.log('Table message de test nettoyée avec succès.');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erreur lors du nettoyage de la base de données de test message :', error);
    }
};
