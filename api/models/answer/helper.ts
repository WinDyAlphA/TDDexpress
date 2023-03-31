import { database } from "../../config/database";
import { Answer } from "./answer";

export namespace AnswerHelper {
    export const getAllAnswer = (): Array<Answer> => {
        return database.prepare('SELECT * FROM answer').all();
    }

    export const getAnswerById = (id: string): Answer => {
        let arr = []
        arr.push(id)
        return database.prepare('SELECT * FROM answer WHERE id = ?').get(arr);
    }

    export const getAnswerByQuestionId = (question_id: string): Array<Answer> => {
        let arr = []
        arr.push(question_id)
        return database.prepare('SELECT * FROM answer WHERE question_id = ?').all(arr);
    }

    export const deleteAnswerById = (id: string): void => {
        let arr = []
        arr.push(id)
        database.prepare('DELETE FROM answer WHERE id = ?').run(arr);
    }

    export const createAnswer = (question_id:string,is_correct:number): void => {
        let arr = []
        arr.push(question_id)
        arr.push(is_correct)
        database.prepare('INSERT INTO answer (question_id,is_correct) VALUES (?, ?)').run(arr);
    }
    
        

}
