import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../services";


export async function getAllNotes(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Notes', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllNotesFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Notes', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getNoteFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return (await facade.sqlStorage.sqlRead('Notes', query, requestedData))[0];
    } catch (e) {
        throw e;
    }
}


export async function createNoteFilteredByUserID(data: any) {
    try {
        return await facade.sqlStorage.sqlCreate('Notes', data)
    } catch (e) {
        throw e;
    }
}


export async function updateNoteFilteredByUserID(query: any, data: any) {
    try {
        return await facade.sqlStorage.sqlUpdate('Notes', query, data)
    } catch (e) {
        throw e;
    }
}


export async function deleteNoteFilteredByUserID(query: any) {
    try {
        return await facade.sqlStorage.sqlDelete('Notes', query)
    } catch (e) {
        throw e;
    }
}


