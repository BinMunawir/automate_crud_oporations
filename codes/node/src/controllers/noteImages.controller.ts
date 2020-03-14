import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../services";


export async function getAllNoteImages(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('NoteImages', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllNoteImagesFilteredByNoteID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('NoteImages', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getNoteImageFilteredByNoteID(query: any, requestedData: any[]) {
    try {
        return (await facade.sqlStorage.sqlRead('NoteImages', query, requestedData))[0];
    } catch (e) {
        throw e;
    }
}


export async function createNoteImageFilteredByNoteID(data: any) {
    try {
        return await facade.sqlStorage.sqlCreate('NoteImages', data)
    } catch (e) {
        throw e;
    }
}


export async function updateNoteImageFilteredByNoteID(query: any, data: any) {
    try {
        return await facade.sqlStorage.sqlUpdate('NoteImages', query, data)
    } catch (e) {
        throw e;
    }
}


export async function deleteNoteImageFilteredByNoteID(query: any) {
    try {
        return await facade.sqlStorage.sqlDelete('NoteImages', query)
    } catch (e) {
        throw e;
    }
}


