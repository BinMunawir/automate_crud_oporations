import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getDocuments(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Documents', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createDocuments(data: any) {
    try {
      if (data.documentID == null) data.documentID = shortid.generate();
        await service.sqlStorage.sqlCreate('Documents', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getDocument(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Documents', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateDocument(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Documents', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteDocument(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Documents', query);
    } catch (e) {
        throw e;
    }
}
                  