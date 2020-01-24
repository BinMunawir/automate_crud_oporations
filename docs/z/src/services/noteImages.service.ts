import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../facades";

        export async function getNoteImages(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('NoteImages', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createNoteImages(data: any) {
    try {
        await facade.sqlStorage.sqlCreate('NoteImages', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getNoteImage(query: any, requestedData: any[]) {
    try {
        let d = (await facade.sqlStorage.sqlRead('NoteImages', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateNoteImage(query: any, data: any) {
    try {
        await facade.sqlStorage.sqlUpdate('NoteImages', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteNoteImage(query: any) {
    try {
        await facade.sqlStorage.sqlDelete('NoteImages', query);
    } catch (e) {
        throw e;
    }
}
                  