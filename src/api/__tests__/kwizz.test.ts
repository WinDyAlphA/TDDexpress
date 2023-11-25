import createApp from '../utils/server';
import supertest from 'supertest';
const app = createApp();
import { setupTestDatabase, teardownTestDatabase } from '../config/test';

beforeAll(async () => {
    await setupTestDatabase();
});
afterAll(async () => {
    await teardownTestDatabase();
});


describe('kwizz', () => {
    describe('getAllKwizz', () => {
        it('should return an array of kwizz', async () => {
            await supertest(app).get('/api/kwizz/').then((response) => {
                console.log(response.text);
                expect(response.body).toBeInstanceOf(Array);
            });
        });
    }
    );
    describe('getKwizzById', () => {
        it('should return a kwizz', () => {
            expect(true).toBe(true);
        });
    }
    );
    describe('createKwizz', () => {
        it('should return a kwizz', () => {
            expect(true).toBe(true);
        });
    });
});