import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllOrganizations(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Organizations', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getOrganization(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Organizations', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createOrganization(data: any) {
    try {
        if (!data.organizationID) data.organizationID = shortid.generate();

                
                return await facade.sqlStorage.sqlCreate('Organizations', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateOrganization(query: any, data: any) {
            try {
              
                return await facade.sqlStorage.sqlUpdate('Organizations', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteOrganization(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Organizations', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        