import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getGlossaries(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Glossaries', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createGlossaries(data: any) {
    try {
      if (data.glossaryID == null) data.glossaryID = shortid.generate();
        await service.sqlStorage.sqlCreate('Glossaries', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getGlossary(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Glossaries', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateGlossary(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Glossaries', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteGlossary(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Glossaries', query);
    } catch (e) {
        throw e;
    }
}
                  