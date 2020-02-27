import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getInquiries(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Inquiries', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createInquiries(data: any) {
    try {
      if (data.inquiryID == null) data.inquiryID = shortid.generate();
        await service.sqlStorage.sqlCreate('Inquiries', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getInquiry(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Inquiries', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateInquiry(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Inquiries', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteInquiry(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Inquiries', query);
    } catch (e) {
        throw e;
    }
}
                  