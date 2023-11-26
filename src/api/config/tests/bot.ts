import { Bot } from "../../models/bot/bot";
import { Pool } from "pg";
import { pool } from "../database";

export const setupBotTable = async (payload: Array<Bot>): Promise<void> => {
    const testData = payload;
    try {
        const client = await pool.connect();
        try {
            for (const data of testData) {
                await client.query(
                    'INSERT INTO bot (character_id, name, image, description, id_fine_tuning) VALUES ($1, $2, $3, $4, $5)',
                    [data.character_id, data.name, data.image, data.description, data.id_fine_tuning]
                );
            }
            console.log('Données de test bot insérées avec succès.');
            await client.query(`
                SELECT * FROM bot;
            `).then((res) => {
                console.log('Sequence bot_character_id_seq remise à jour avec succès.'+res.rows[0].character_id + ' ' + res.rows[0].name + ' ' + res.rows[0].image + ' ' + res.rows[0].description);
            }).catch((err) => {
                console.error('Erreur lors de la remise à jour de la sequence bot_character_id_seq :', err);
            });

        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données bot de test :', error);
    }
};


export const teardownBotTable = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM bot');
            console.log('Table bot de test nettoyée avec succès.');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erreur lors du nettoyage de la base de données de test bot :', error);
    }
};
