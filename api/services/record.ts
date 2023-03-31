import { Record } from '../models/record/record';
import { RecordHelper } from '../models/record/helper';

export namespace RecordService {
    export const getAllRecords = (): Array<Record> => {
        return RecordHelper.getAllRecord();
    };

    export const getRecordById = (id: string): Record => {
        return RecordHelper.getRecordById(id);
    }

    export const getRecordByUserId = (user_id: string): Array<Record> => {
        return RecordHelper.getRecordByUserId(user_id);
    }

    export const getRecordByKwizzId = (kwizz_id: string): Array<Record> => {
        return RecordHelper.getRecordByKwizzId(kwizz_id);
    }

    export const createRecord = (user_id: string, kwizz_id: string, score: string): void => {
        RecordHelper.createRecord(user_id, kwizz_id, score);
    }

    export const updateRecord = (id: string, user_id: string, kwizz_id: string, score: string): void => {
        RecordHelper.updateRecord(id, user_id, kwizz_id, score);
    }

    export const deleteRecord = (id: string): void => {
        RecordHelper.deleteRecord(id);
    }
    


}