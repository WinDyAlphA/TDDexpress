import { Kwizz } from '../models/kwizz/kwizz';
import { KwizzHelper } from '../models/kwizz/helper';

export namespace KwizzService {
    export const getAllKwizz = (): Array<Kwizz> => {
        return KwizzHelper.getAllKwizz();
    }

    export const getKwizzById = (id: string): Kwizz => {
        return KwizzHelper.getKwizzById(id);
    }

    export const createKwizz = (name: string): void => {
        KwizzHelper.createKwizz(name);
    }

    export const updateKwizz = (id: string, name: string): void => {
        KwizzHelper.updateKwizz(id, name);
    }

    export const deleteKwizz = (id: string): void => {
        KwizzHelper.deleteKwizz(id);
    }
    

}