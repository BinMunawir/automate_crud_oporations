import * as utilities from "../utilities";
      import { getAdds, createAdds, getAdd, updateAdd, deleteAdd,  } from "../controllers/adds.controller";

                      let type: AddModel = 
              {addID: '', companyID: '', title: ''}            
      export default [ 
                  {
            path: "/api/companies/:companyID/adds",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.companyID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['addID', 'companyID', 'title', ];
        let data = await getAdds(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/companies/:companyID/adds",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.companyID, req.headers.auth)
        let accepted: string[] = ['addID', 'companyID', 'title', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createAdds(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/companies/:companyID/adds/:addID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.companyID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['addID', 'companyID', 'title', ];
        let data = await getAdd(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/companies/:companyID/adds/:addID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.companyID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['addID', 'companyID', 'title', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateAdd(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/companies/:companyID/adds/:addID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.companyID, req.headers.auth)
        let query = { ...req.params};
        await deleteAdd(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      