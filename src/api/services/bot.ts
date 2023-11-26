import { Bot } from '../models/bot/bot';
import { BotHelper } from '../models/bot/helper';

export namespace BotService {
    export const getAllBot = async (): Promise<Array<Bot>> => {
        return await BotHelper.getAllBot();
    }

    export const getBotById = async (character_id: string): Promise<Bot | null> => {
        return await BotHelper.getBotById(character_id);
    }

    export const createBot = async (name: string, image: string, description: string): Promise<Bot | null> => {
        return await BotHelper.createBot(name, image, description);
    }
}