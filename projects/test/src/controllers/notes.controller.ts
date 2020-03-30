import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllNotesFilteredByUserID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Notes', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getNoteFilteredByUserID(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Notes', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createNote(data: any) {
    try {
        if (!data.noteID) data.noteID = shortid.generate();

        
if(data.title)
	data.title = await utilities.storeFile(data.title, 'titles/notes-'+ data.noteID + '-title');

if (!data.title) throw new HTTP400Error(1111, 'title is required')
        
                return await facade.sqlStorage.sqlCreate('Notes', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateNote(query: any, data: any) {
            try {
              
if(data.title)
	data.title = await utilities.storeFile(data.title, 'titles/notes-'+ data.noteID + '-title');

                return await facade.sqlStorage.sqlUpdate('Notes', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteNote(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Notes', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        