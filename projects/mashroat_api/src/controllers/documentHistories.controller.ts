import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllDocumentHistoriesFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('DocumentHistories', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllDocumentHistoriesFilteredByDocumentID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('DocumentHistories', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllDocumentHistoriesFilteredByUserIDAndDocumentID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('DocumentHistories', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getDocumentHistorieFilteredByUserIDAndDocumentID(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('DocumentHistories', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createDocumentHistorie(data: any) {
    try {
        if (!data.documentHistorieID) data.documentHistorieID = shortid.generate();

                
                return await facade.sqlStorage.sqlCreate('DocumentHistories', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateDocumentHistorie(query: any, data: any) {
            try {
              
                return await facade.sqlStorage.sqlUpdate('DocumentHistories', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteDocumentHistorie(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('DocumentHistories', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        