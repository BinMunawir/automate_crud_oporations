import * as utilities from "../utilities";
      import { getNoteImages, createNoteImages, getNoteImage, updateNoteImage, deleteNoteImage,  } from "../services/noteImages.service";

                      let type: NoteImageModel = 
              {noteImageID: '', userID: '', noteID: '', content: {mimetype: 'pdf',}, cover: {mimetype: 'image',}}            
      export default [ 
                  {
            path: "/api/users/:userID/notes/:noteID/noteImages",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteImageID', 'userID', 'noteID', 'content', 'cover', ];
        let data = await getNoteImages(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes/:noteID/noteImages",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let accepted: string[] = ['content', 'cover', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createNoteImages(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes/:noteID/noteImages/:noteImageID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteImageID', 'userID', 'noteID', 'content', 'cover', ];
        let data = await getNoteImage(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes/:noteID/noteImages/:noteImageID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['content', 'cover', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateNoteImage(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/notes/:noteID/noteImages/:noteImageID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params};
        await deleteNoteImage(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      