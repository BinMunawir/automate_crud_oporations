import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllHistoriesFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Histories', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getHistorieFilteredByUserID(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Histories', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createHistorie(data: any) {
    try {
        if (!data.historieID) data.historieID = shortid.generate();

                
                return await facade.sqlStorage.sqlCreate('Histories', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateHistorie(query: any, data: any) {
            try {
              
                return await facade.sqlStorage.sqlUpdate('Histories', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteHistorie(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Histories', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        