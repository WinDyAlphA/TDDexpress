// testDatabase.ts
import { connectionDB,database } from "../database";






export const setupTestDatabase = async () => {
    // Établir la connexion à la base de données de test ou nettoyer la base de données
    // en fonction de votre approche de test.
    await connectionDB(); // Assurez-vous que cette fonction prend en charge la configuration de test.
};


export const teardownTestDatabase = async () => {
    // Fermer la connexion à la base de données de test ou nettoyer la base de données
    // en fonction de votre approche de test.
    await database.close(); // Assurez-vous que cette fonction prend en charge la configuration de test.
}