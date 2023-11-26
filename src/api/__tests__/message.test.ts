import createApp from '../utils/server';
import supertest from 'supertest';
const app = createApp();
import { server } from '../../index';

import { setupTestDatabase, teardownTestDatabase } from '../config/tests/test';
import { teardownMessageTable, setupMessageTable } from '../config/tests/message';

const payloadMessage = [
    { message_id: '1', content: 'Thierry henri est le meilleur joueur de football rien a foutre je l\'ai touché le cheque', timestamp:1700952220888, },
    { message_id: '2', content: 'Bon ca commence a bien faire j\'ai pas tout la nuit (si), en sah j\'aime bien l\'idée du projet même si un peu d\'aide ne serait pas de refus', timestamp: 1700952220888, },
    // Ajoutez d'autres données de test au besoin
] 


beforeAll(async () => {
    await setupTestDatabase();
    await setupMessageTable(payloadMessage);
});
beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
});
afterAll(async () => {
    await teardownMessageTable();
    await teardownTestDatabase();
    server.close();
});

describe('API Message', () => {
    describe('Route pour obtenir un message', () => {
        describe('étant donné que le message n\'existe pas', () => {
            it('devrait renvoyer un statut 404', async () => {
                await supertest(app).get('/api/message/39232').then((response) => {
                    expect(response.status).toBe(404);
                });
            });
        });


        describe('étant donné que le message existe et est défini', () => {
            it('devrait renvoyer un message de test', async () => {
                await supertest(app).get('/api/message/1').then((response) => {
                    expect(response.body).toEqual({ message_id: '1', content: 'Thierry henri est le meilleur joueur de football rien a foutre je l\'ai touché le cheque', timestamp: expect.any(Number) });
                });
            });
        });
    });
    describe('Route pour obtenir tous les messages', () => {
        describe('étant donné que la table des messages est vide', () => {
            it('devrait renvoyer un tableau vide', async () => {
                await teardownMessageTable();
                await supertest(app).get('/api/message').then((response) => {
                    expect(response.body).toEqual([]);
                });
            });
        });

        describe('étant donné que la table des messages n\'est pas vide', () => {
            it('devrait renvoyer un tableau de messages', async () => {
                await setupMessageTable(payloadMessage);
                await supertest(app).get('/api/message').then((response) => {
                    expect(response.body).toEqual([{ message_id: '1', content: 'Thierry henri est le meilleur joueur de football rien a foutre je l\'ai touché le cheque', timestamp: expect.any(Number) }, { message_id: '2', content: 'Bon ca commence a bien faire j\'ai pas tout la nuit (si), en sah j\'aime bien l\'idée du projet même si un peu d\'aide ne serait pas de refus', timestamp: expect.any(Number) }]);
                });
            });
        });
    });
    describe('Route pour créer un message', () => {
        describe('étant donné que le message est créé', () => {
            it('devrait renvoyer un message', async () => {
                await supertest(app).post('/api/message/create').send({ content: 'test' }).then((response) => {
                    expect(response.body).toBeInstanceOf(Object);
                });
            });
        });
        describe('étant donné que le message est créé et défini', () => {
            it('devrait renvoyer un message de test', async () => {
                await supertest(app).post('/api/message/create').send({ content: 'test' }).then((response) => {
                    expect(response.body).toEqual({ message_id: expect.any(String), content: 'test', timestamp: expect.any(Number) });
                });
            });
        });
    });
});