import * as utilities from "../utilities";
      import { getVolumes, createVolumes, getVolume, updateVolume, deleteVolume,  } from "../controllers/volumes.controller";

                      let type: VolumeModel = 
              {volumeID: '', adminID: '', bookID: '', arabicTitle: '', englishTitle: '', lastModified: 0, modifiedBy: 0, version: 0, video: {mimetype: 'video',}}            
      export default [ 
                  {
            path: "/api/admins/:adminID/books/:bookID/volumes",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['volumeID', 'adminID', 'bookID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'version', 'video', ];
        let data = await getVolumes(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let accepted: string[] = ['volumeID', 'adminID', 'bookID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'version', 'video', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createVolumes(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['volumeID', 'adminID', 'bookID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'version', 'video', ];
        let data = await getVolume(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['volumeID', 'adminID', 'bookID', 'arabicTitle', 'englishTitle', 'lastModified', 'modifiedBy', 'version', 'video', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateVolume(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID/books/:bookID/volumes/:volumeID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params};
        await deleteVolume(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      