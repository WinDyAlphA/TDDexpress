import { Request,Response } from "express";
const route = require('express').Router();
import { AnswerService } from '../services/answer';

route.get('/', (req: Request, res: Response) => {
    const answers = AnswerService.getAnswers();
    res.send(answers);
});

route.post('/create', (req: Request, res: Response) => {
    const {question_id, is_correct} = req.body;
    const newAnswer = AnswerService.createAnswer(question_id, is_correct);
    res.send(newAnswer);
});

route.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const answer = AnswerService.getAnswer(id);
    res.send(answer);
});

export = route;
