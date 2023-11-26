import { Message } from "../../models/message/message";
import { connectionDB,database } from "../database";

export const setupMessageTable = async (payload: Array<Message>) => {
    const testData = payload;
    try {
        const stmt = database.prepare('INSERT INTO message (message_id, content, timestamp) VALUES (?, ?, ?)');
        testData.forEach((data) => {
            stmt.run(data.message_id, data.content, data.timestamp);
        });
        console.log('Données de test message insérées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données message de test :', error);
    }
};

export const teardownMessageTable = async () => {
    try {
        const stmt = database.prepare('DELETE FROM message');
        stmt.run();
        console.log('Table message de test nettoyée avec succès.');
    } catch (error) {
        console.error('Erreur lors du nettoyage de la base de données de test message :', error);
    }
};