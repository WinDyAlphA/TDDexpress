import { Message } from '../models/message/message';
import { MessageHelper } from '../models/message/helper';

export namespace MessageService {
    export const getAllMessage = async (): Promise<Array<Message>> => {
        return await MessageHelper.getAllMessage();
    }

    export const getMessageById = async (message_id: string): Promise<Message | null> => {
        return await MessageHelper.getMessageById(message_id);
    }

    export const createMessage = async (content: string): Promise<Message | null> => {
        return await MessageHelper.createMessage(content);
    }
}