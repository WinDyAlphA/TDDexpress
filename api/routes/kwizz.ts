import { Request,Response } from "express";
const route = require('express').Router();
import { KwizzService } from '../services/kwizz';

route.get('/', (req: Request, res: Response) => {
    const kwizzs = KwizzService.getAllKwizz();
    res.send(kwizzs);
});

route.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const kwizz = KwizzService.getKwizzById(id);
    res.send(kwizz);
});

route.post('/create', (req: Request, res: Response) => {
    const {name} = req.body;
    const newKwizz = KwizzService.createKwizz(name);
    res.send(newKwizz);
});
        





export default route;