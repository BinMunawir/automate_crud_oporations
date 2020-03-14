import { getAllNotes, getAllNotesFilteredByUserID, getNoteFilteredByUserID, createNoteFilteredByUserID, updateNoteFilteredByUserID, deleteNoteFilteredByUserID, } from "../controllers/notes.controller";
import { checkQuery1, verifyToken, checkBody1, acceptedBody, filterByAccept, filterByPrevent, checkValues, storeFile } from "../utilities";

let noteType: NoteModel = {
userID: '',
noteID: '',
title: '',
image1: 'noteImages: png',
image2: 'noteImages: png',
}

export default [  {
    path: "/api/notes",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'noteID', 'title', 'image1', 'image2'];
        let query = filterByAccept([...queryAccept, ...accept], req.query);
        checkValues(query, noteType);
        query = { ...req.params, ...query }

        let returnedFields: string[] = ['userID', 'noteID', 'title', 'image1', 'image2'];
        let data = await getAllNotes(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'noteID', 'title', 'image1', 'image2'];
        let query = filterByAccept([...queryAccept, ...accept], req.query);
        checkValues(query, noteType);
        query = { ...req.params, ...query }

        let returnedFields: string[] = ['userID', 'noteID', 'title', 'image1', 'image2'];
        let data = await getAllNotesFilteredByUserID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['userID', 'noteID', 'title', 'image1', 'image2'];
        let data = await getNoteFilteredByUserID({ noteID: req.params.noteID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = { ...req.params, ...req.body };
        let acceptList: string[] = ['userID', 'noteID', 'title', 'image1', 'image2']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, noteType)

        await createNoteFilteredByUserID(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = { ...req.params, ...req.body };
        let acceptList: string[] = ['userID', 'noteID', 'title', 'image1', 'image2']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, noteType)
        
        await updateNoteFilteredByUserID({ noteID: req.params.noteID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteNoteFilteredByUserID({ noteID: req.params.noteID });
        res.status(200).send();
      }
    ]
  }
]