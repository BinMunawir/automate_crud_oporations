import { getAllDocumentHistoriesFilteredByUserID, getAllDocumentHistoriesFilteredByDocumentID, getAllDocumentHistoriesFilteredByUserIDAndDocumentID, getDocumentHistorieFilteredByUserIDAndDocumentID, createDocumentHistorie, updateDocumentHistorie, deleteDocumentHistorie, } from "../controllers/documentHistories.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let documentHistorieType: DocumentHistorieModel = {
userID: '',
bookID: '',
volumeID: '',
chapterID: '',
documentID: '',
documentHistorieID: '',
createdDate: 0,
modifiedDate: 0,
actionType: 0,
actionDate: 0,
ipAddress: '',
}

export default [  {
    path: "/api/users/:userID/documentHistories",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, documentHistorieType);

        let returnedFields: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress'];
        let data = await getAllDocumentHistoriesFilteredByUserID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/documents/:documentID/documentHistories",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, documentHistorieType);

        let returnedFields: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress'];
        let data = await getAllDocumentHistoriesFilteredByDocumentID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/documentHistories",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, documentHistorieType);

        let returnedFields: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress'];
        let data = await getAllDocumentHistoriesFilteredByUserIDAndDocumentID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/documentHistories/:documentHistorieID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress'];
        let data = await getDocumentHistorieFilteredByUserIDAndDocumentID({ documentHistorieID: req.params.documentHistorieID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/documentHistories",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, documentHistorieType)

        await createDocumentHistorie(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/documentHistories/:documentHistorieID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'documentHistorieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'ipAddress']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, documentHistorieType)
        
        await updateDocumentHistorie({ documentHistorieID: req.params.documentHistorieID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/documentHistories/:documentHistorieID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteDocumentHistorie({ documentHistorieID: req.params.documentHistorieID });
        res.status(200).send();
      }
    ]
  }
]