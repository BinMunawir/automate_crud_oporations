import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllVolumesFilteredByBookID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Volumes', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getVolumeFilteredByBookID(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Volumes', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createVolume(data: any) {
    try {
        if (!data.volumeID) data.volumeID = shortid.generate();

        
if (!data.createdBy) throw new HTTP400Error(1111, 'createdBy is required')
        
                return await facade.sqlStorage.sqlCreate('Volumes', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateVolume(query: any, data: any) {
            try {
              
                return await facade.sqlStorage.sqlUpdate('Volumes', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteVolume(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Volumes', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        