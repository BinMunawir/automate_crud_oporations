
import { acceptedBody } from "../utilities";
import { HTTP400Error } from "../models/http400error";
import facade from "../services";


export async function createNote(data: any) {
    if (data.userID == null || data.noteID == null)
        throw new HTTP400Error(106, 'userID and noteID are required');

    try {
        return await facade.sqlStorage.sqlCreate('Notes', data)
    } catch (e) {
        throw e;
    }
}

export async function getNotes(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Notes', query, requestedData)
    } catch (e) {
        throw e;
    }
}

export async function getNote(query: any, requestedData: any[]) {
    try {
        let d = await facade.sqlStorage.sqlRead('Notes', query, requestedData)
        if (d.length() == 0)
            throw new Error('error: there is no data by that id')
        return (d[0]);
    } catch (e) {
        if (e.message.includes("there is no data by that id"))
            throw new HTTP400Error(102, e.message);
        throw e;
    }
}

export async function updateNote(query: any, data: any) {
    try {
        return await facade.sqlStorage.sqlUpdate('Notes', query, data)
    } catch (e) {
        throw e;
    }
}

export async function deleteNote(query: any) {
    try {
        return await facade.sqlStorage.sqlDelete('Notes', query)
    } catch (e) {
        throw e;
    }
}
