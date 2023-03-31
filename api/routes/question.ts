import { Request,Response } from "express";
const route = require('express').Router();
import { KwizzService } from '../services/kwizz';
import { QuestionService } from "../services/question";

route.get('/', (req: Request, res: Response) => {
    const questions = QuestionService.getAllQuestions();
    res.send(questions);
});

route.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const question = QuestionService.getQuestionById(id);
    res.send(question);
});

route.post('/create', (req: Request, res: Response) => {
    const {kwizz_id, question} = req.body;
    const newQuestion = QuestionService.createQuestion(kwizz_id, question);
    res.send(newQuestion);
});

route.get('/kwizz/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const questions = QuestionService.getQuestionByKwizzId(id);
    res.send({
        quizzId : id,
        questions
    });
});

        





export default route;