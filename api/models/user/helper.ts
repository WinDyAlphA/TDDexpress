import { User } from './user';
import { database } from '../../config/database';

export namespace UserHelper {
    export const getAllUser = (): Array<User> => {
        return database.prepare('SELECT * FROM user').all(); 
    }

    export const getUserById = (id: string): User => {
        let arr = []
        arr.push(id)
        return database.prepare('SELECT * FROM user WHERE id = ?').get(arr); 
    }

    export const getUserByName = (name: string): User => {
        let arr = []
        arr.push(name)
        return database.prepare('SELECT * FROM user WHERE name = ?').get(arr); 
    }

    export const createUser = (name: string): void => {
        let arr = []
        arr.push(name)
        database.prepare('INSERT INTO user (name) VALUES (?)').run(arr); 
    }

    export const deleteUser = (id: string): void => {
        let arr = []
        arr.push(id)
        database.prepare('DELETE FROM user WHERE id = ?').run(arr) 
    }

}

