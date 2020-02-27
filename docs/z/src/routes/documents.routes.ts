import * as utilities from "../utilities";
      import { getDocuments, createDocuments, getDocument, updateDocument, deleteDocument,  } from "../controllers/documents.controller";

                      let type: DocumentModel = 
              {documentID: '', adminID: '', bookID: '', volumeID: '', chapterID: '', arabicTitle: '', englishTitle: '', lastModified: 0, modifiedBy: 0, versionNumber: 0, document: {mimetype: 'pdf',}}            
      export default [ 
                  {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['documentID', 'adminID', 'bookID', 'volumeID', 'chapterID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'versionNumber', 'document', ];
        let data = await getDocuments(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let accepted: string[] = ['documentID', 'adminID', 'bookID', 'volumeID', 'chapterID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'versionNumber', 'document', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createDocuments(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents/:documentID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['documentID', 'adminID', 'bookID', 'volumeID', 'chapterID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'versionNumber', 'document', ];
        let data = await getDocument(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents/:documentID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['documentID', 'adminID', 'bookID', 'volumeID', 'chapterID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'versionNumber', 'document', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateDocument(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters/:chapterID/documents/:documentID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params};
        await deleteDocument(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      