import createApp from '../utils/server';
import supertest from 'supertest';
const app = createApp();
import { setupTestDatabase, teardownTestDatabase } from '../config/tests/test';
import { teardownUserTable, setupUserTable } from '../config/tests/user';
import { server } from '../../index';

const payloadUser = [
    { user_id: '1', name: 'John Doe' },
    { user_id: '2', name: 'Jane Smith' },
    // Ajoutez d'autres données de test au besoin
];

beforeAll(async () => {
    await setupTestDatabase();
    await setupUserTable(payloadUser);
});
beforeEach(() => {
    //comment a line to see the log with importance level of the second parameter
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    //jest.spyOn(console, 'warn').mockImplementation(() => {});
    //jest.spyOn(console, 'info').mockImplementation(() => {});
    //jest.spyOn(console, 'debug').mockImplementation(() => {});
});
afterAll(async () => {
    await teardownUserTable();
    server.close();
    await teardownTestDatabase();
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
});

describe('API Utilisateurs', () => {

    describe('Route pour obtenir un utilisateur', () => {

        describe('étant donné que l\'utilisateur n\'existe pas', () => {
            it('devrait renvoyer un statut 404', async () => {
                await supertest(app).get('/api/user/39232').then((response) => {
                    expect(response.status).toBe(404);
                });
            });
        });

        describe('étant donné que l\'utilisateur existe et est défini', () => {
            it('devrait renvoyer un utilisateur de test', async () => {
                await supertest(app).get('/api/user/1').then((response) => {
                    expect(response.body).toEqual({ user_id: '1', name: 'John Doe' });
                });
            });
        });
    });

    describe('Route pour obtenir tous les utilisateurs', () => {
        describe('étant donné que la table des utilisateurs est vide', () => {
            it('devrait renvoyer un tableau vide', async () => {
                await teardownUserTable();
                await supertest(app).get('/api/user').then((response) => {
                    expect(response.body).toEqual([]);
                });
            });
        });

        describe('étant donné que la table des utilisateurs n\'est pas vuser_ide', () => {
            it('devrait renvoyer un tableau d\'utilisateurs', async () => {
                await setupUserTable(payloadUser);
                await supertest(app).get('/api/user').then((response) => {
                    expect(response.body).toEqual([{ user_id: '1', name: 'John Doe' }, { user_id: '2', name: 'Jane Smith' }]);
                });
            });
        });
    });

    describe('Route pour créer un utilisateur', () => {
        describe('étant donné que l\'utilisateur a un nom', () => {
            describe('créer un utilisateur', () => {
                it('devrait renvoyer l\'utilisateur créé', async () => {
                    await supertest(app).post('/api/user/create').send({ name: 'test' }).then((response) => {
                        expect(response.body).toEqual({ user_id: expect.any(String), name: 'test' });
                    });
                });
            });
        });

        describe('étant donné que l\'utilisateur n\'est pas créé', () => {
            it('devrait renvoyer un statut 400', async () => {
                jest.spyOn(console, 'error').mockImplementation(() => {});
                await supertest(app).post('/api/user/create').send({}).then((response) => {
                    expect(response.status).toBe(400)
                });
            });
        });
    });
});
