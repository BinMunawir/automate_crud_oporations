import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllAdmins(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Admins', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAdmin(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Admins', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createAdmin(data: any) {
    try {
        if (!data.adminID) data.adminID = shortid.generate();

                
                return await facade.sqlStorage.sqlCreate('Admins', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateAdmin(query: any, data: any) {
            try {
              
                return await facade.sqlStorage.sqlUpdate('Admins', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteAdmin(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Admins', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        