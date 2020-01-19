import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../facades";

        export async function getNotes(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Notes', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            // TODO: implementation
            export async function getNote(query: any, requestedData: any[]) {
    try {
        return (await facade.sqlStorage.sqlRead('Notes', query, requestedData))[0];
    } catch (e) {
        throw e;
    }
}

            export async function updateNote(query: any, data: any) {
    try {
        await facade.sqlStorage.sqlUpdate('Notes', query, data);
    } catch (e) {
        throw e;
    }
}
            // TODO: implementation
                  