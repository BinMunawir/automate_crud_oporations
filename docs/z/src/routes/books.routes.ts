import * as utilities from "../utilities";
      import { getBooks, createBooks, getBook, updateBook, deleteBook,  } from "../controllers/books.controller";

                      let type: BookModel = 
              {bookID: '', adminID: '', arabicTitle: '', englishTitle: '', number: 0, lastModified: 0, modifiedBy: 0, version: 0, video: {mimetype: 'video',}}            
      export default [ 
                  {
            path: "/api/admins/:adminID/books",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['bookID', 'adminID', 'arabicTitle', 'englishTitle', 'number', 'lastModified', 'modifiedBy', 'version', 'video', ];
        let data = await getBooks(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let accepted: string[] = ['bookID', 'adminID', 'arabicTitle', 'englishTitle', 'number', 'lastModified', 'modifiedBy', 'version', 'video', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createBooks(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['bookID', 'adminID', 'arabicTitle', 'englishTitle', 'number', 'lastModified', 'modifiedBy', 'version', 'video', ];
        let data = await getBook(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['bookID', 'adminID', 'arabicTitle', 'englishTitle', 'number', 'lastModified', 'modifiedBy', 'version', 'video', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateBook(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params};
        await deleteBook(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      