import * as utilities from "../utilities";
      import { getAdmins, createAdmins, getAdmin, updateAdmin, deleteAdmin,  } from "../controllers/admins.controller";

                      let type: AdminModel = 
              {adminID: '', name: '', password: '', role: '', email: '', addedDate: 0, lastActivity: 0, status: 0}            
      export default [ 
                  {
            path: "/api/admins",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['adminID', 'name', 'password', 'role', 'email', 'addedDate', 'lastActivity', 'status', ];
        let data = await getAdmins(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                        let accepted: string[] = ['adminID', 'name', 'password', 'role', 'email', 'addedDate', 'lastActivity', 'status', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createAdmins(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['adminID', 'name', 'password', 'role', 'email', 'addedDate', 'lastActivity', 'status', ];
        let data = await getAdmin(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['adminID', 'name', 'password', 'role', 'email', 'addedDate', 'lastActivity', 'status', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateAdmin(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/admins/:adminID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.adminID, req.headers.auth)
        let query = { ...req.params};
        await deleteAdmin(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      