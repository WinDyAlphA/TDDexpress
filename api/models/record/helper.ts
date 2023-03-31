import { Record } from './record';
import { database } from '../../config/database';

export namespace RecordHelper {
    export const getAllRecord = (): Array<Record> => {
        return database.prepare('SELECT * FROM question').all(); 
    }

    export const getRecordById = (id: string): Record => {
        let arr = []
        arr.push(id)
        return database.prepare('SELECT * FROM question WHERE id = ?').get(arr); 
    }

    export const getRecordByKwizzId = (kwizz_id: string): Array<Record> => {
        let arr = []
        arr.push(kwizz_id)
        return database.prepare('SELECT * FROM question WHERE kwizz_id = ?').all(arr); 
    }

    export const getRecordByUserId = (user_id: string): Array<Record> => {
        let arr = []
        arr.push(user_id)
        return database.prepare('SELECT * FROM question WHERE user_id = ?').all(arr);
    }

    export const createRecord = (kwizz_id: string, question: string, answer: string): void => {
        let arr = []
        arr.push(kwizz_id)
        arr.push(question)
        arr.push(answer)
        database.prepare('INSERT INTO question(kwizz_id, question, answer) VALUES(?, ?, ?)').run(arr) 
    }

    export const updateRecord = (id: string, kwizz_id: string, question: string, answer: string): void => {
        let arr = []
        arr.push(kwizz_id)
        arr.push(question)
        arr.push(answer)
        arr.push(id)
        database.prepare('UPDATE question SET kwizz_id = ?, question = ?, answer = ? WHERE id = ?').run(arr) 
    }

    export const deleteRecord = (id: string): void => {
        let arr = []
        arr.push(id)
        database.prepare('DELETE FROM question WHERE id = ?').run(arr) 
    }





}