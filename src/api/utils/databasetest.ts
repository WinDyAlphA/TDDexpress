
import { database } from '../config/database';

export const insertTestData = () => {
    const testData = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        // Ajoutez d'autres données de test au besoin
    ];

    try {
        const stmt = database.prepare('INSERT INTO user (id, name) VALUES (?, ?)');
        testData.forEach((data) => {
            stmt.run(data.id, data.name);
        });
        console.log('Données de test insérées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données de test :', error);
    }
};

export const setupTestDatabase = async () => {
    // Insérer des données de test avant les tests
    insertTestData();
};

export const teardownTestDatabase = async () => {
    // Nettoyer les données de test après les tests
    try {
        const stmt = database.prepare('DELETE FROM user');
        stmt.run();
        console.log('Base de données de test nettoyée avec succès.');
    } catch (error) {
        console.error('Erreur lors du nettoyage de la base de données de test :', error);
    }
};