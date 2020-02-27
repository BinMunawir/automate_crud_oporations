import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getBooks(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Books', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createBooks(data: any) {
    try {
      if (data.bookID == null) data.bookID = shortid.generate();
        await service.sqlStorage.sqlCreate('Books', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function getBook(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('Books', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            export async function updateBook(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Books', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteBook(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Books', query);
    } catch (e) {
        throw e;
    }
}
                  