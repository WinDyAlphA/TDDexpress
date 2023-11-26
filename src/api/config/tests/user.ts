
import { connectionDB,database } from "../database";
import { User } from "../../models/user/user";

export const setupUserTable = async (payload: Array<User>) => {
    // Insérer des données de test avant les tests
    const testData = payload;
    try {
        const stmt = database.prepare('INSERT INTO user (user_id, name) VALUES (?, ?)');
        testData.forEach((data) => {
            stmt.run(data.user_id, data.name);
        });
        console.log('Données de test user insérées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données user de test :', error);
    }
};

export const teardownUserTable = async () => {
    try {
        const stmt = database.prepare('DELETE FROM user');
        stmt.run();
        console.log('Table user de test nettoyée avec succès.');
    } catch (error) {
        console.error('Erreur lors du nettoyage de la base de données de test user :', error);
    }
};