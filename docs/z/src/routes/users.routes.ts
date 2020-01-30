import * as utilities from "../utilities";
      import { getUsers, createUsers, getUser, updateUser, deleteUser,  } from "../controllers/users.controller";

                      let type: UserModel = 
              {userID: '', password: '', username: '', avatar: {mimetype: 'image',}, cv: {mimetype: 'pdf',}}            
      export default [ 
                  {
            path: "/api/users",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['userID', 'password', 'username', 'avatar', 'cv', ];
        let data = await getUsers(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/users",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                        let accepted: string[] = ['userID', 'password', 'username', 'avatar', 'cv', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createUsers(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['userID', 'password', 'username', 'avatar', 'cv', ];
        let data = await getUser(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/users/:userID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['userID', 'password', 'username', 'avatar', 'cv', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateUser(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params};
        await deleteUser(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      