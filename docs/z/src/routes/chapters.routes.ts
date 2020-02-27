import * as utilities from "../utilities";
      import { getChapters, createChapters, getChapter, updateChapter, deleteChapter,  } from "../controllers/chapters.controller";

                      let type: ChapterModel = 
              {chapterID: '', adminID: '', bookID: '', volumeID: '', arabicTitle: '', englishTitle: '', lastModified: 0, modifiedBy: 0, versionNumber: 0, versionDate: 0, chapter: {mimetype: 'doc',}}            
      export default [ 
                  {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['chapterID', 'adminID', 'bookID', 'volumeID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'versionNumber', 'versionDate', 'chapter', ];
        let data = await getChapters(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let accepted: string[] = ['chapterID', 'adminID', 'bookID', 'volumeID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'versionNumber', 'versionDate', 'chapter', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createChapters(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters/:chapterID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['chapterID', 'adminID', 'bookID', 'volumeID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'versionNumber', 'versionDate', 'chapter', ];
        let data = await getChapter(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters/:chapterID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['chapterID', 'adminID', 'bookID', 'volumeID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'versionNumber', 'versionDate', 'chapter', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateChapter(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID/chapters/:chapterID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params};
        await deleteChapter(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      