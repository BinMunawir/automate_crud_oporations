import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllUsers(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Users', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getUser(query: any, requestedData: any[]) {
    try {
        return (await facade.sqlStorage.sqlRead('Users', query, requestedData))[0];
    } catch (e) {
        throw e;
    }
}


export async function createUser(data: any) {
    try {
        if (!data.userID) data.userID = shortid.generate();

        if (data.avatar)
            data.avatar = await utilities.storeFile(data.avatar,
                'profile_avatars/' + data.userID + '-avatar');

        return await facade.sqlStorage.sqlCreate('Users', data)
    } catch (e) {
        throw e;
    }
}


export async function updateUser(query: any, data: any) {
    try {
        return await facade.sqlStorage.sqlUpdate('Users', query, data)
    } catch (e) {
        throw e;
    }
}


export async function deleteUser(query: any) {
    try {
        return await facade.sqlStorage.sqlDelete('Users', query)
    } catch (e) {
        throw e;
    }
}


