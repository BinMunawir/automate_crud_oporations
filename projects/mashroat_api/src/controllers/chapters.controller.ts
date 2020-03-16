import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


export async function getAllChaptersFilteredByVolumeID(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('Chapters', query, requestedData);
    } catch (e) {
        throw e;
    }
}


export async function getChapterFilteredByVolumeID(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('Chapters', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


export async function createChapter(data: any) {
    try {
        if (!data.chapterID) data.chapterID = shortid.generate();

        
if(data.chapter)
	data.chapter = await utilities.storeFile(data.chapter, 'chapters/chapters-'+ data.chapterID + '-chapter');

if (!data.createdBy) throw new HTTP400Error(1111, 'createdBy is required')
        
                return await facade.sqlStorage.sqlCreate('Chapters', data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function updateChapter(query: any, data: any) {
            try {
              
if(data.chapter)
	data.chapter = await utilities.storeFile(data.chapter, 'chapters/chapters-'+ data.chapterID + '-chapter');

                return await facade.sqlStorage.sqlUpdate('Chapters', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
                export async function deleteChapter(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('Chapters', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        