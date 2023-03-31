import { User } from '../models/user/user';
import { UserHelper } from '../models/user/helper';


export namespace UserServices {

    export const getUserById=(id: string): User => {
        return UserHelper.getUserById(id);
    }

    export const getUserByName=(name: string): User => {
        return UserHelper.getUserByName(name);
    }

    export const getAllUsers=(): Array<User> => {
        return UserHelper.getAllUser();
    }

    export const createUser=(name: string): void => {
        UserHelper.createUser(name);
    }

    export const deleteUser=(id: string): void => {
        UserHelper.deleteUser(id);
    }

}