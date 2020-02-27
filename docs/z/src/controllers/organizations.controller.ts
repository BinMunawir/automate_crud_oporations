import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getOrganizations(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Organizations', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createOrganizations(data: any) {
    try {
      if (data.organizationID == null) data.organizationID = shortid.generate();
        await service.sqlStorage.sqlCreate('Organizations', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getOrganization(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Organizations', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateOrganization(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Organizations', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteOrganization(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Organizations', query);
    } catch (e) {
        throw e;
    }
}
                  