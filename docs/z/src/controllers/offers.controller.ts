import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getOffers(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Offers', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createOffers(data: any) {
    try {
      if (data.offerID == null) data.offerID = shortid.generate();
        await service.sqlStorage.sqlCreate('Offers', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getOffer(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Offers', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateOffer(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Offers', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteOffer(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Offers', query);
    } catch (e) {
        throw e;
    }
}
                  