import express from 'express'; 
import { createServer } from 'http'; 
import api from './api';
import { connectionDB } from './api/config/database';
import createApp from './api/utils/server';

const app = createApp();



export const server = createServer(app) 

let retries = 5;

const startConnectionDB = async () => {
    while (retries) {
        try {
            connectionDB().then(() => {
                server.listen('8080', () => {
                console.log('Listening on port 8080'); });
                console.log('Connected to database');
                
            }).catch((error) => console.error('DB Error', error))
            
            break;
        } catch (error) {
            console.log(error);
            retries -= 1;
            console.log(`retries left: ${retries}`);
            // wait 5 seconds
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

startConnectionDB();


