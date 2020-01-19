import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../facades";

        export async function getUsers(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Users', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function getUser(query: any, requestedData: any[]) {
    try {
        let d = (await facade.sqlStorage.sqlRead('Users', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateUser(query: any, data: any) {
    try {
        await facade.sqlStorage.sqlUpdate('Users', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteUser(query: any) {
    try {
        await facade.sqlStorage.sqlDelete('Users', query);
    } catch (e) {
        throw e;
    }
}
                  