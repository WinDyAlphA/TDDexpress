import { Bot } from '../models/bot/bot';
import { BotHelper } from '../models/bot/helper';

export namespace BotService {
    export const getAllBot = (): Array<Bot> => {
        return BotHelper.getAllBot();
    }

    export const findBotById = (id: string): Bot | null => {
        return BotHelper.getBotById(id);
    }

    export const createBot = (name: string, image: String, description: String): Bot | null => {
        return BotHelper.createBot(name, image, description);
    }
}