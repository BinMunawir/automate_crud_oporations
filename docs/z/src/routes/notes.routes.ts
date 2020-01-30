import * as utilities from "../utilities";
      import { getNotes, createNotes, getNote, updateNote, deleteNote,  } from "../controllers/notes.controller";

                      let type: NoteModel = 
              {noteID: '', userID: '', title: ''}            
      export default [ 
                  {
            path: "/api/users/:userID/notes",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'userID', 'title', ];
        let data = await getNotes(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let accepted: string[] = ['noteID', 'userID', 'title', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createNotes(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes/:noteID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'userID', 'title', ];
        let data = await getNote(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes/:noteID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'userID', 'title', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateNote(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes/:noteID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params};
        await deleteNote(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      