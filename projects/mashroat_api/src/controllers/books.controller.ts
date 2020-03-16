import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllBooks(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Books', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getBook(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Books', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createBook(data: any) {
    try {
        if (!data.bookID) data.bookID = shortid.generate();

        
if(data.video)
	data.video = await utilities.storeFile(data.video, 'videos/books-'+ data.bookID + '-video');

if (!data.createdBy) throw new HTTP400Error(1111, 'createdBy is required')
        
                return await facade.sqlStorage.sqlCreate('Books', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateBook(query: any, data: any) {
            try {
              
if(data.video)
	data.video = await utilities.storeFile(data.video, 'videos/books-'+ data.bookID + '-video');

                return await facade.sqlStorage.sqlUpdate('Books', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteBook(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Books', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        