import createApp from '../utils/server';
import supertest from 'supertest';
const app = createApp();
import { server } from '../../index';
import { Bot } from '../models/bot/bot';

import { setupTestDatabase, teardownTestDatabase } from '../config/tests/test';
import { teardownBotTable, setupBotTable } from '../config/tests/bot';

const payloadMessage = [
    { character_id: '1', name: 'message 1', image: 'link ou b64', description: 'description 1', id_fine_tuning: '1' },
    { character_id: '2', name: 'message 2', image: 'link ou b64', description: 'description 2', id_fine_tuning: '2' },
] 

beforeAll(async () => {
    await setupTestDatabase();
    await setupBotTable(payloadMessage);
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
    await teardownBotTable();
    await teardownTestDatabase();
    server.close();
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
});

describe('API Bot', () => {
    describe('Route pour obtenir un bot', () => {

        describe('étant donné que le bot n\'existe pas', () => {
            it('devrait renvoyer un statut 404', async () => {
                await supertest(app).get('/api/bot/39232').then((response) => {
                    expect(response.status).toBe(404);
                });
            });
        });
    
        describe('étant donné que le bot existe et est défini', () => {
            it('devrait renvoyer un bot de test', async () => {
                await supertest(app).get('/api/bot/1').then((response) => {
                    expect(response.body).toEqual({ character_id: '1', name: 'message 1', image: 'link ou b64', description: 'description 1', id_fine_tuning: '1' });
                });
            });
        });
    });
    describe('Route pour obtenir tous les bots', () => {
        describe('étant donné que la table des bots est vide', () => {
            it('devrait renvoyer un tableau vide', async () => {
                await teardownBotTable();
                await supertest(app).get('/api/bot').then((response) => {
                    expect(response.body).toEqual([]);
                });
            });
        });
        describe('étant donné que la table des bots n\'est pas vide', () => {
            it('devrait renvoyer un tableau de bots', async () => {
                await setupBotTable(payloadMessage);
                await supertest(app).get('/api/bot').then((response) => {
                    expect(response.body).toEqual([{ character_id: '1', name: 'message 1', image: 'link ou b64', description: 'description 1', id_fine_tuning: '1' }, { character_id: '2', name: 'message 2', image: 'link ou b64', description: 'description 2', id_fine_tuning: '2' }]);
                });
            });
        });
    });
    describe('Route pour créer un bot', () => {
        describe('étant donné que le bot est créé', () => {
            it('devrait renvoyer un bot', async () => {
                await supertest(app).post('/api/bot/create').send({ name: 'message 3', image: 'link ou b64', description: 'description 3' }).then((response) => {
                    expect(response.body).toEqual({ character_id: expect.any(String), name: 'message 3', image: 'link ou b64', description: 'description 3', id_fine_tuning: expect.any(String) });
                });
            });
        });
        describe('étant donné que le bot a une erreure de création', () => {
            it('devrait renvoyer un statut 400', async () => {
                await supertest(app).post('/api/bot/create').send({ jsp: '3' }).then((response) => {
                    expect(response.status).toBe(400);
                });
            });
        });
        
    });
});



