
import { Request,Response } from "express";
const route = require('express').Router();
import { BotService } from '../services/bot';

route.get('/', (req: Request, res: Response) => {
    const bots = BotService.getAllBot();
    res.send(bots);
});

route.get('/:id', (req: Request, res: Response) => {
    const botId = req.params.id;
    
    const bot = BotService.findBotById(botId);

    if (bot) {
        res.json(bot);
    } else {
        res.status(404).json({ message: 'Bot non trouvé' });
    }
});

route.post('/create', (req: Request, res: Response) => {
    const {name, image, description} = req.body;
    const newBot = BotService.createBot(name, image, description);
    if (newBot) {
        res.json(newBot);
    }
    else {
        res.status(500).json({ message: 'Erreur lors de la création du bot' });
    }
});

export default route;