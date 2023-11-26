import express from 'express'; 
import { createServer } from 'http'; 
import api from './api';
import { connectionDB } from './api/config/database';
import createApp from './api/utils/server';

const app = createApp();



export const server = createServer(app) 


connectionDB().then(() => {
    server.listen('8080', () => {
    console.log('Listening on port 8080'); });
    
}).catch((error) => console.error('DB Error', error))

