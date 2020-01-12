      import { Request, Response } from "express";
      import { getUsers, createUser, getUser, updateUser, deleteUser,  } from "../services/users.service";

      export default [ 
                  {
            path: "/api/users",
            method: "get",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getUsers(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/api/users",
            method: "post",
            handler: [
              async (req: Request, res: Response) => {
                          await createUser(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID",
            method: "get",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getUser(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/api/users/:userID",
            method: "put",
            handler: [
              async (req: Request, res: Response) => {
                          await updateUser(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID",
            method: "delete",
            handler: [
              async (req: Request, res: Response) => {
                          await deleteUser(req.params, req.query, req.headers);
          res.status(200).send();
                        }
            ]
          },

                ];
      