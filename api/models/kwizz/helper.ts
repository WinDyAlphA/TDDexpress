import { Kwizz } from './kwizz';
import { database } from '../../config/database';

export namespace KwizzHelper {
    export const getAllKwizz = (): Array<Kwizz> => {
        return database.prepare('SELECT * FROM kwizz').all(); 
    }

    export const getKwizzById = (id: string): Kwizz => {
        let arr = []
        arr.push(id)
        return database.prepare('SELECT * FROM Kwizz WHERE id = ?').get(arr); 
    }

    export const createKwizz = (name: string): void => {
        let arr = []
        arr.push(name)
        database.prepare('INSERT INTO Kwizz(name) VALUES(?)').run(arr) 
    }

    export const deleteKwizz = (id: string): void => {
        let arr = []
        arr.push(id)
        database.prepare('DELETE FROM Kwizz WHERE id = ?').run(arr) 
    }

    export const updateKwizz = (id: string, name: string): void => {
        let arr = []
        arr.push(name)
        arr.push(id)
        database.prepare('UPDATE Kwizz SET name = ? WHERE id = ?').run(arr) 
    }
    

}