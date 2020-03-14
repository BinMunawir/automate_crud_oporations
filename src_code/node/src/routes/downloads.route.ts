import { getAllDownloads, getAllDownloadsFilteredByUserID, getAllDownloadsFilteredByBookID, getAllDownloadsFilteredByUserIDAndBookID, getDownloadFilteredByUserIDAndBookID, createDownloadFilteredByUserIDAndBookID, updateDownloadFilteredByUserIDAndBookID, deleteDownloadFilteredByUserIDAndBookID, } from "../controllers/downloads.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let downloadType: DownloadModel = {
userID: '',
bookID: '',
downloadID: '',
data: 0,
}

export default [  {
    path: "/api/downloads",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, downloadType) };
        let accepted = ['userID', 'bookID', 'downloadID', 'data'];
        let data = await getAllDownloads(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/downloads",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, downloadType) };
        let accepted = ['userID', 'bookID', 'downloadID', 'data'];
        let data = await getAllDownloadsFilteredByUserID(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID/downloads",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, downloadType) };
        let accepted = ['userID', 'bookID', 'downloadID', 'data'];
        let data = await getAllDownloadsFilteredByBookID(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/books/:bookID/downloads",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, downloadType) };
        let accepted = ['userID', 'bookID', 'downloadID', 'data'];
        let data = await getAllDownloadsFilteredByUserIDAndBookID(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/books/:bookID/downloads/:downloadID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, downloadType) };
        let accepted = ['userID', 'bookID', 'downloadID', 'data'];
        let data = await getDownloadFilteredByUserIDAndBookID(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/books/:bookID/downloads",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, downloadType));
        await createDownloadFilteredByUserIDAndBookID(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/books/:bookID/downloads/:downloadID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, downloadType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, downloadType, req.params));
        
        await updateDownloadFilteredByUserIDAndBookID(query, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/books/:bookID/downloads/:downloadID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await deleteDownloadFilteredByUserIDAndBookID(query);
        res.status(200).send();
      }
    ]
  }
]