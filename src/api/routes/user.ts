
import { Request,Response } from "express";
const route = require('express').Router();
import { UserService } from '../services/user';

route.get('/', (req: Request, res: Response) => {
    const users = UserService.getAllUser();
    res.send(users);
});

route.get('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    
    const user = UserService.findUserById(userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
});

route.post('/create', (req: Request, res: Response) => {
    const {name} = req.body;
    const newUser = UserService.createUser(name);
    if (newUser) {
        res.json(newUser);
    }
    else {
        res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
});


export default route;