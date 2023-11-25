import { Message } from '../models/message/message';
import { MessageHelper } from '../models/message/helper';

export namespace MessageService {
    export const getAllMessage = (): Array<Message> => {
        return MessageHelper.getAllMessage();
    }
    
    export const findMessageById = (id: string): Message | null => {
        return MessageHelper.getMessageById(id);
    }

    export const createMessage = (content: string): Message | null => {
        return MessageHelper.createMessage(content);
    }
}