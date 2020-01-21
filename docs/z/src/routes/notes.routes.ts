import * as utilities from "../utilities";
      import { getNotes, createNote, getNote, updateNote, deleteNote,  } from "../services/notes.service";

                      let type: NoteModel = 
              {noteID: '', userID: '', title: '', date: 0, content: {mimetype: 'text',}}            
      export default [ 
                  {
            path: "/api/users/:userID/notes",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'userID', 'title', 'date', 'content', ];
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
        let accepted: string[] = ['noteID', 'userID', 'title', 'date', 'content', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createNote(body);
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
        let accepted: string[] = ['noteID', 'userID', 'title', 'date', 'content', ];
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
        let accepted: string[] = ['noteID', 'userID', 'title', 'date', 'content', ]
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
      