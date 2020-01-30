import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

export async function getCompanies(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Companies', query, requestedData);
    } catch (e) {
        throw e;
    }
}

export async function createCompanies(data: any) {
    try {
        if (data.companyID == null) data.companyID = shortid.generate();
        await service.sqlStorage.sqlCreate('Companies', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
export async function getCompany(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Companies', query, requestedData));
        if (d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
        return d[0]
    } catch (e) {
        throw e;
    }
}

export async function updateCompany(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Companies', query, data);
    } catch (e) {
        throw e;
    }
}
export async function deleteCompany(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Companies', query);
    } catch (e) {
        throw e;
    }
}
