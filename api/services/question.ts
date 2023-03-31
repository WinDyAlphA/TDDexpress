import { Question } from '../models/question/question';
import { QuestionHelper } from '../models/question/helper';


export namespace QuestionService {
    export const getQuestions = (kwizz_id: string): Array<Question> => {
        return QuestionHelper.getQuestionByKwizzId(kwizz_id);
    }

    export const getQuestionById = (id: string): Question => {
        return QuestionHelper.getQuestionById(id);
    }

    export const getAllQuestions=(): Array<Question> => {
        return QuestionHelper.getAllQuestion();
    }

    export const createQuestion=(kwizz_id: string, question: string): void => {
        QuestionHelper.createQuestion(kwizz_id, question);
    }

    export const updateQuestion=(id: string, kwizz_id: string, question: string): void => {
        QuestionHelper.updateQuestion(id, kwizz_id, question);
    }

    export const deleteQuestion=(id: string): void => {
        QuestionHelper.deleteQuestion(id);
    }

    export const getQuestionByKwizzId = (kwizz_id: string): Array<Question> => {
        return QuestionHelper.getQuestionByKwizzId(kwizz_id);
    }
    
}