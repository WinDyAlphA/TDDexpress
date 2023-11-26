import { User } from '../models/user/user';
import { UserHelper } from '../models/user/helper';

export namespace UserService {
    export const getAllUser = async (): Promise<Array<User>> => {
        return await UserHelper.getAllUser();
    }

    export const getUserById = async (user_id: string): Promise<User | null> => {
        return await UserHelper.getUserById(user_id);
    }

    export const createUser = async (name: string): Promise<User | null> => {
        return await UserHelper.createUser(name);
    }
}