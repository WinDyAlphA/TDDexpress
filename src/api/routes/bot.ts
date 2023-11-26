
import { Request,Response } from "express";
const route = require('express').Router();
import { BotService } from '../services/bot';

route.get('/', async (req: Request, res: Response) => {
    try {
            const bots = await BotService.getAllBot();
            res.send(bots);
        }
    catch (error) {
        console.error('Erreur lors de la récupération des bots :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

route.get('/:id', async (req: Request, res: Response) => {
    const botId = req.params.id;
    try {
        const bot = await BotService.getBotById(botId);
        if (bot) {
            res.json(bot);
        } else {
            res.status(404).json({ message: 'Bot non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du bot :', error);
        res.status(500).send('Erreur interne du serveur');
    }
}
);

route.post('/create', async (req: Request, res: Response) => {
    const {name, image, description} = req.body;
    try {
        const newBot = await BotService.createBot(name, image, description);
        if (newBot) {
            res.json(newBot);
        }
        else {
            res.status(400).json({ message: 'Erreur lors de la création du bot' });
        }
    } catch (error) {
        console.error('Erreur lors de la création du bot :', error);
        res.status(500).send('Erreur interne du serveur');
    }
}
);

export default route;