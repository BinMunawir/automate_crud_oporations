import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllGlossaries(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Glossaries', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getGlossary(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Glossaries', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createGlossary(data: any) {
    try {
        if (!data.glossaryID) data.glossaryID = shortid.generate();

        
if (!data.createdBy) throw new HTTP400Error(1111, 'createdBy is required')
        
                return await facade.sqlStorage.sqlCreate('Glossaries', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateGlossary(query: any, data: any) {
            try {
              
                return await facade.sqlStorage.sqlUpdate('Glossaries', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteGlossary(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Glossaries', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        