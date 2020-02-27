import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getAdmins(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Admins', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createAdmins(data: any) {
    try {
      if (data.adminID == null) data.adminID = shortid.generate();
        await service.sqlStorage.sqlCreate('Admins', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getAdmin(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Admins', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateAdmin(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Admins', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteAdmin(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Admins', query);
    } catch (e) {
        throw e;
    }
}
                  