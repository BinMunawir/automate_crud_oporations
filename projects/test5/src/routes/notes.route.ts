import { getAllNotes, getAllNotesFilteredByUserID, getNoteFilteredByUserID, createNoteFilteredByUserID, updateNoteFilteredByUserID, deleteNoteFilteredByUserID, } from "../controllers/notes.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let noteType: NoteModel = {
userID: '',
noteID: '',
title: '',
content: '',
date: 0,
}

export default [  {
    path: "/api/notes",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, noteType) };
        let accepted = ['userID', 'noteID', 'title', 'content', 'date'];
        let data = await getAllNotes(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, noteType) };
        let accepted = ['userID', 'noteID', 'title', 'content', 'date'];
        let data = await getAllNotesFilteredByUserID(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, noteType) };
        let accepted = ['userID', 'noteID', 'title', 'content', 'date'];
        let data = await getNoteFilteredByUserID(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, noteType));
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
        let query = { ...req.params, ...checkQuery(req.query, noteType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, noteType, req.params));
        
        await updateNoteFilteredByUserID(query, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await deleteNoteFilteredByUserID(query);
        res.status(200).send();
      }
    ]
  }
]