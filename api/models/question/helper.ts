import { Question } from './question';
import { database } from '../../config/database';

export namespace QuestionHelper {
    export const getAllQuestion = (): Array<Question> => {
        return database.prepare('SELECT * FROM question').all(); 
    }

    export const getQuestionById = (id: string): Question => {
        let arr = []
        arr.push(id)
        return database.prepare('SELECT * FROM question WHERE id = ?').get(arr); 
    }

    export const getQuestionByKwizzId = (kwizz_id: string): Array<Question> => {
        let arr = []
        arr.push(kwizz_id)
        return database.prepare('SELECT * FROM question WHERE kwizz_id = ?').all(arr); 
    }

    export const createQuestion = (kwizz_id: string, question: string): void => {
        let arr = []
        arr.push(kwizz_id)
        arr.push(question)
        database.prepare('INSERT INTO question(kwizz_id, question) VALUES(?, ?)').run(arr) 
    }

    export const updateQuestion = (id: string, kwizz_id: string, question: string): void => {
        let arr = []
        arr.push(kwizz_id)
        arr.push(question)
        arr.push(id)
        database.prepare('UPDATE question SET kwizz_id = ?, question = ? WHERE id = ?').run(arr) 
    }

    export const deleteQuestion = (id: string): void => {
        let arr = []
        arr.push(id)
        database.prepare('DELETE FROM question WHERE id = ?').run(arr) 
    }




}