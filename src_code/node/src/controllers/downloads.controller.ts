import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../services";


export async function getAllDownloads(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Downloads', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllDownloadsFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Downloads', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllDownloadsFilteredByBookID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Downloads', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllDownloadsFilteredByUserIDAndBookID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Downloads', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getDownloadFilteredByUserIDAndBookID(query: any, requestedData: any[]) {
    try {
        return (await facade.sqlStorage.sqlRead('Downloads', query, requestedData))[0];
    } catch (e) {
        throw e;
    }
}


export async function createDownloadFilteredByUserIDAndBookID(data: any) {
    try {
        return await facade.sqlStorage.sqlCreate('Downloads', data)
    } catch (e) {
        throw e;
    }
}


export async function updateDownloadFilteredByUserIDAndBookID(query: any, data: any) {
    try {
        return await facade.sqlStorage.sqlUpdate('Downloads', query, data)
    } catch (e) {
        throw e;
    }
}


export async function deleteDownloadFilteredByUserIDAndBookID(query: any) {
    try {
        return await facade.sqlStorage.sqlDelete('Downloads', query)
    } catch (e) {
        throw e;
    }
}


