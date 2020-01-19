import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";
import { getUsers, getUser, updateUser, deleteUser, } from "../services/users.service";

let type: UserModel =
  { userID: '', password: '', name: '', data: 0, avatar: { mimetype: 'image', } }
export default [
  {
    path: "/api/users",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, type) };
        let accepted: string[] = ['userID', 'password', 'name', 'data', 'avatar',];
        let data = await getUsers(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  },

  {
    path: "/api/users/:userID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, type) };
        let accepted: string[] = ['userID', 'password', 'name', 'data', 'avatar',];
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
        let query = { ...req.params, ...checkQuery(req.query, type) };
        let accepted: string[] = ['userID', 'password', 'name', 'data', 'avatar',]
        let body = acceptedBody(accepted, await checkBody(req.body, type, req.params));
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
        // TODO: implementation
      }
    ]
  },

];
