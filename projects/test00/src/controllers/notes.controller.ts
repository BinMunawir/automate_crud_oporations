import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllNotes(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Notes', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getAllNotesFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Notes', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getNoteFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return (await facade.sqlStorage.sqlRead('Notes', query, requestedData))[0];
    } catch (e) {
        throw e;
    }
}


export async function createNoteFilteredByUserID(data: any) {
    try {
        if (!data.noteID) data.noteID = shortid.generate();

        
if(data.image1)
	data.image1 = await utilities.storeFile(data.image1, 'noteImages/'+ data.noteID + '-image1');

if(data.image2)
	data.image2 = await utilities.storeFile(data.image2, 'noteImages/'+ data.noteID + '-image2');
        
                return await facade.sqlStorage.sqlCreate('Notes', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateNoteFilteredByUserID(query: any, data: any) {
            try {
                return await facade.sqlStorage.sqlUpdate('Notes', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteNoteFilteredByUserID(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Notes', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        