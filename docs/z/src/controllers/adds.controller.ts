import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getAdds(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Adds', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createAdds(data: any) {
    try {
      if (data.addID == null) data.addID = shortid.generate();
        await service.sqlStorage.sqlCreate('Adds', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getAdd(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Adds', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateAdd(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Adds', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteAdd(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Adds', query);
    } catch (e) {
        throw e;
    }
}
                  