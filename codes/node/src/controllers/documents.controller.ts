import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllDocumentsFilteredByChapterID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Documents', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getDocumentFilteredByChapterID(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Documents', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createDocument(data: any) {
    try {
        if (!data.documentID) data.documentID = shortid.generate();

        
if(data.document)
	data.document = await utilities.storeFile(data.document, 'documents/documents-'+ data.documentID + '-document');

if (!data.createdBy) throw new HTTP400Error(1111, 'createdBy is required')
        
                return await facade.sqlStorage.sqlCreate('Documents', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateDocument(query: any, data: any) {
            try {
              
if(data.document)
	data.document = await utilities.storeFile(data.document, 'documents/documents-'+ data.documentID + '-document');

                return await facade.sqlStorage.sqlUpdate('Documents', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteDocument(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Documents', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        