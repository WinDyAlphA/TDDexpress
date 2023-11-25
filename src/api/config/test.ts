// testDatabase.ts
import { connectionDB,database } from "./database";
import { User } from "../models/user/user";
import { Message } from "../models/message/message";

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
}

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
}


export const setupTestDatabase = async () => {
    // Établir la connexion à la base de données de test ou nettoyer la base de données
    // en fonction de votre approche de test.
    await connectionDB(); // Assurez-vous que cette fonction prend en charge la configuration de test.
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
export const teardownMessageTable = async () => {
    try {
        const stmt = database.prepare('DELETE FROM message');
        stmt.run();
        console.log('Table message de test nettoyée avec succès.');
    } catch (error) {
        console.error('Erreur lors du nettoyage de la base de données de test message :', error);
    }
};