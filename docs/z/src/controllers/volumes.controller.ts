import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getVolumes(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Volumes', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createVolumes(data: any) {
    try {
      if (data.volumeID == null) data.volumeID = shortid.generate();
        await service.sqlStorage.sqlCreate('Volumes', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getVolume(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Volumes', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateVolume(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Volumes', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteVolume(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Volumes', query);
    } catch (e) {
        throw e;
    }
}
                  