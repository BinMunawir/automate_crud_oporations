import * as utilities from "../utilities";
      import { getNotes, createNote, getNote, updateNote, deleteNote,  } from "../services/notes.service";

                      let type: NoteModel = 
              {noteID: '', userID: '', title: '', data: 0, image: {mimetype: 'image',}}            
      export default [ 
                  {
            path: "/api/users/:userID/notes",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'userID', 'title', 'data', 'image', ];
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
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'userID', 'title', 'data', 'image', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await createNote(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes/:noteID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'userID', 'title', 'data', 'image', ];
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
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'userID', 'title', 'data', 'image', ]
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
                          // TODO: implementation
                        }
            ]
          },

                ];
      