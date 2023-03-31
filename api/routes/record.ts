import { Request,Response } from "express";
const route = require('express').Router();
import { RecordService } from '../services/record';

route.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const record = RecordService.getRecordById(id);
    res.send(record);
});

route.get('/', (req: Request, res: Response) => {
    const records = RecordService.getAllRecords();
    res.send(records);
});

route.post('/create', (req: Request, res: Response) => {
    const {name, score, kwizz_id} = req.body;
    const newRecord = RecordService.createRecord(name, score, kwizz_id);
    res.send(newRecord);
});

export = route;