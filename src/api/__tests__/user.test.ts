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

describe('user', () => {
    describe('get user route', () => {
        describe('given the user does not exist', () => {
            it('should return a 404', async () => {
                await supertest(app).get('/api/user/39232').then((response) => {
                    expect(response.status).toBe(404);
                });
            });
        });
        describe('given the user exists', () => {
            it('should return a user', async () => {
                await supertest(app).get('/api/user/1').then((response) => {
                    expect(response.body).toBeInstanceOf(Object);
                });
            });
        });
        describe('given the user exists and defined', () => {
            it('should return a test user', async () => {
                await supertest(app).get('/api/user/1').then((response) => {
                    expect(response.body).toEqual({ id: '1', name: 'John Doe' });
                });
            });
        });
    });
    describe('get all user route', () => {
        describe('given the user table is empty', () => {
            it('should return an empty array', async () => {
                await teardownTestDatabase();
                await supertest(app).get('/api/user').then((response) => {
                    expect(response.body).toEqual([]);
                });
            });
        });
        describe('given the user table is not empty', () => {
            it('should return an array of user', async () => {
                await setupTestDatabase();
                await supertest(app).get('/api/user').then((response) => {
                    expect(response.body).toEqual([{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Smith' }]);
                });
            });
        });
    });
    describe('create user route', () => {
        describe('given the user as a name', () => {
            describe('creeate user', () => {
                it('should return the created user', async () => {
                    await supertest(app).post('/api/user/create').send({ name: 'test' }).then((response) => {
                        expect(response.body).toEqual({id:expect.any(String), name: 'test' });
                    });
                });
            });
        });
        describe('given the user is not created', () => {
            it('should return a 400', async () => {
                await supertest(app).post('/api/user/create').send({}).then((response) => {
                    expect(response.status).toBe(400);
                });
            });
        });
    });
});