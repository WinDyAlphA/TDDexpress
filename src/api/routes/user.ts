
import { Request,Response } from "express";
const route = require('express').Router();
import { UserService } from '../services/user';

route.get('/', async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUser();
        res.send(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

route.get('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await UserService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

route.post('/create', async (req: Request, res: Response) => {
    const {name} = req.body;
    try {
        const newUser = await UserService.createUser(name);
        if (newUser) {
            res.json(newUser);
        }
        else {
            res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur' });
        }
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});



export default route;