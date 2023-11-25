import { User } from '../models/user/user';
import { UserHelper } from '../models/user/helper';

export namespace UserService {
    export const getAllUser = (): Array<User> => {
        return UserHelper.getAllUser();
    }

    export const findUserById = (id: string): User | null => {
        return UserHelper.getUserById(id);
    }

    export const createUser = (name: string): User | null => {
        return UserHelper.createUser(name);
    }
}