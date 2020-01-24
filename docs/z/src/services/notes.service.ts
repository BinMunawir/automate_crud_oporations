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

            export async function createNotes(data: any) {
    try {
        await facade.sqlStorage.sqlCreate('Notes', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getNote(query: any, requestedData: any[]) {
    try {
        let d = (await facade.sqlStorage.sqlRead('Notes', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
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
            export async function deleteNote(query: any) {
    try {
        await facade.sqlStorage.sqlDelete('Notes', query);
    } catch (e) {
        throw e;
    }
}
                  