import { getAllDocumentsFilteredByChapterID, getDocumentFilteredByChapterID, createDocument, updateDocument, deleteDocument, } from "../controllers/documents.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let documentType: DocumentModel = {
bookID: '',
volumeID: '',
chapterID: '',
documentID: '',
createdDate: 0,
createdBy: '',
modifiedDate: 0,
modifiedBy: '',
arTitle: '',
enTitle: '',
code: '',
versionNumber: 0,
versionDate: 0,
link: '',
numberOfDownloads: 0,
document: 'documents: docx-pdf',
}

export default [  {
    path: "/api/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['bookID', 'volumeID', 'chapterID', 'documentID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'link', 'numberOfDownloads', 'document'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, documentType);

        let returnedFields: string[] = ['bookID', 'volumeID', 'chapterID', 'documentID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'link', 'numberOfDownloads', 'document'];
        let data = await getAllDocumentsFilteredByChapterID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents/:documentID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['bookID', 'volumeID', 'chapterID', 'documentID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'link', 'numberOfDownloads', 'document'];
        let data = await getDocumentFilteredByChapterID({ documentID: req.params.documentID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['bookID', 'volumeID', 'chapterID', 'documentID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'link', 'numberOfDownloads', 'document']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, documentType)

        await createDocument(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents/:documentID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['bookID', 'volumeID', 'chapterID', 'documentID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'link', 'numberOfDownloads', 'document']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, documentType)
        
        await updateDocument({ documentID: req.params.documentID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents/:documentID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteDocument({ documentID: req.params.documentID });
        res.status(200).send();
      }
    ]
  }
]