import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllInquiriesFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Inquiries', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllInquiriesFilteredByDocumentID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Inquiries', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllInquiriesFilteredByUserIDAndDocumentID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Inquiries', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getInquiryFilteredByUserIDAndDocumentID(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Inquiries', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createInquiry(data: any) {
    try {
        if (!data.inquiryID) data.inquiryID = shortid.generate();

                
                return await facade.sqlStorage.sqlCreate('Inquiries', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateInquiry(query: any, data: any) {
            try {
              
                return await facade.sqlStorage.sqlUpdate('Inquiries', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteInquiry(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Inquiries', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        