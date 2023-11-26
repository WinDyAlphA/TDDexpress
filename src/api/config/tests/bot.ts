import { connectionDB,database } from "../database";
import { Bot } from "../../models/bot/bot";



export const setupBotTable = async (payload: Array<Bot>) => {
    const testData = payload;
    try {
        const stmt = database.prepare('INSERT INTO bot (character_id, name,image,description, id_fine_tuning ) VALUES (?, ?, ?, ?, ?)');
        testData.forEach((data) => {
            stmt.run(data.character_id, data.name, data.image, data.description, data.id_fine_tuning);
        });
        console.log('Données de test bot insérées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données bot de test :', error);
    }
};

export const teardownBotTable = async () => {
    try {
        const stmt = database.prepare('DELETE FROM bot');
        stmt.run();
        console.log('Table bot de test nettoyée avec succès.');
    } catch (error) {
        console.error('Erreur lors du nettoyage de la base de données de test bot :', error);
    }
};