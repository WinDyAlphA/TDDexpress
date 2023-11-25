
import { Request,Response } from "express";
const route = require('express').Router();
import { MessageService } from '../services/message';

route.get('/', (req: Request, res: Response) => {
    const messages = MessageService.getAllMessage();
    res.send(messages);
});


route.get('/:id', (req: Request, res: Response) => {
    const messageId = req.params.id;
    
    const message = MessageService.findMessageById(messageId);

    if (message) {
        res.json(message);
    } else {
        res.status(404).json({ message: 'Message non trouvé' });
    }
});

route.post('/create', (req: Request, res: Response) => {
    const {content} = req.body;
    const newMessage = MessageService.createMessage(content);
    if (newMessage) {
        res.json(newMessage);
    }
    else {
        res.status(400).json({ message: 'Erreur lors de la création du message' });
    }
});

export default route;