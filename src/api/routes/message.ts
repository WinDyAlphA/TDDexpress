
import { Request,Response } from "express";
const route = require('express').Router();
import { MessageService } from '../services/message';

route.get('/', async (req: Request, res: Response) => {
    try {
        const messages = await MessageService.getAllMessage();
        res.send(messages);
    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        res.status(500).send('Erreur interne du serveur');
    }
}
);

route.get('/:id', async (req: Request, res: Response) => {
    const messageId = req.params.id;
    try {
        const message = await MessageService.getMessageById(messageId);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({ message: 'Message non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du message :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

route.post('/create', async (req: Request, res: Response) => {
    const {content} = req.body;
    try {
        const newMessage = await MessageService.createMessage(content);
        if (newMessage) {
            res.json(newMessage);
        }
        else {
            res.status(400).json({ message: 'Erreur lors de la création du message' });
        }
    } catch (error) {
        console.error('Erreur lors de la création du message :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

export default route;