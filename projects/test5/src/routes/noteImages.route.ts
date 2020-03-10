import { getAllNoteImages, getAllNoteImagesFilteredByNoteID, getNoteImageFilteredByNoteID, createNoteImageFilteredByNoteID, updateNoteImageFilteredByNoteID, deleteNoteImageFilteredByNoteID, } from "../controllers/noteImages.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let noteImageType: noteImageModel = {
userID: '',
noteID: '',
noteImageID: '',
image: }

export default [  {
    path: "/api/noteImages",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, noteImageType) };
        let accepted = ['userID', 'noteID', 'noteImageID', 'image'];
        let data = await getAllNoteImages(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID/noteImages",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, noteImageType) };
        let accepted = ['userID', 'noteID', 'noteImageID', 'image'];
        let data = await getAllNoteImagesFilteredByNoteID(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID/noteImages/:noteImageID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, noteImageType) };
        let accepted = ['userID', 'noteID', 'noteImageID', 'image'];
        let data = await getNoteImageFilteredByNoteID(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID/noteImages",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, noteImageType));
        await createNoteImageFilteredByNoteID(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID/noteImages/:noteImageID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, noteImageType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, noteImageType, req.params));
        
        await updateNoteImageFilteredByNoteID(query, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID/noteImages/:noteImageID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await deleteNoteImageFilteredByNoteID(query);
        res.status(200).send();
      }
    ]
  }
]