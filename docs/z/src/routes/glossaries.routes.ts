import * as utilities from "../utilities";
      import { getGlossaries, createGlossaries, getGlossary, updateGlossary, deleteGlossary,  } from "../controllers/glossaries.controller";

                      let type: GlossaryModel = 
              {glossaryID: '', adminID: '', word: '', meaning: '', addedDate: 0, lastModified: 0}            
      export default [ 
                  {
            path: "/api/admins/:adminID/glossaries",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['glossaryID', 'adminID', 'word', 'meaning', 'addedDate', 'lastModified', ];
        let data = await getGlossaries(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/glossaries",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let accepted: string[] = ['glossaryID', 'adminID', 'word', 'meaning', 'addedDate', 'lastModified', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createGlossaries(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/glossaries/:glossaryID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['glossaryID', 'adminID', 'word', 'meaning', 'addedDate', 'lastModified', ];
        let data = await getGlossary(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/glossaries/:glossaryID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['glossaryID', 'adminID', 'word', 'meaning', 'addedDate', 'lastModified', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateGlossary(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/glossaries/:glossaryID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params};
        await deleteGlossary(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      