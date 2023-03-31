import { Request,Response } from "express";
const route = require('express').Router();
import { UserServices } from '../services/user';

route.get('/', (req: Request, res: Response) => {
    const users = UserServices.getAllUsers();
    res.send(users);
});

route.post('/create', (req: Request, res: Response) => {
    const {name} = req.body;
    const newUser = UserServices.createUser(name);
    res.send(newUser);
});

route.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const user = UserServices.getUserById(id);
    res.send(user);
});


export = route;