import { Answer } from '../models/answer/answer';
import { AnswerHelper } from '../models/answer/helper';


export namespace AnswerService {
    export const getAnswers = (): Array<Answer> => {
        return AnswerHelper.getAllAnswer();
    }

    export const getAnswer = (id: string): Answer => {
        return AnswerHelper.getAnswerById(id);
    }

    export const getAnswersByQuestionId = (question_id: string): Array<Answer> => {
        return AnswerHelper.getAnswerByQuestionId(question_id);
    }

    export const createAnswer = (question_id: string, is_correct: number): void => {
        AnswerHelper.createAnswer(question_id, is_correct);
    }
    

        
}