import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../services";


export async function getAllBooks(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Books', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getBook(query: any, requestedData: any[]) {
    try {
        return (await facade.sqlStorage.sqlRead('Books', query, requestedData))[0];
    } catch (e) {
        throw e;
    }
}


export async function createBook(data: any) {
    try {
        return await facade.sqlStorage.sqlCreate('Books', data)
    } catch (e) {
        throw e;
    }
}


export async function updateBook(query: any, data: any) {
    try {
        return await facade.sqlStorage.sqlUpdate('Books', query, data)
    } catch (e) {
        throw e;
    }
}


export async function deleteBook(query: any) {
    try {
        return await facade.sqlStorage.sqlDelete('Books', query)
    } catch (e) {
        throw e;
    }
}


