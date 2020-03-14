import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../services";


export async function getAllGroups(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Groups', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getGroup(query: any, requestedData: any[]) {
    try {
        return (await facade.sqlStorage.sqlRead('Groups', query, requestedData))[0];
    } catch (e) {
        throw e;
    }
}


export async function createGroup(data: any) {
    try {
        return await facade.sqlStorage.sqlCreate('Groups', data)
    } catch (e) {
        throw e;
    }
}


export async function updateGroup(query: any, data: any) {
    try {
        return await facade.sqlStorage.sqlUpdate('Groups', query, data)
    } catch (e) {
        throw e;
    }
}


export async function deleteGroup(query: any) {
    try {
        return await facade.sqlStorage.sqlDelete('Groups', query)
    } catch (e) {
        throw e;
    }
}


