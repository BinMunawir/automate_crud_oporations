import { getAllUsers, getUser, createUser, updateUser, deleteUser, } from "../controllers/users.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let userType: UserModel = {
userID: '',
name: '',
password: '',
}

export default [  {
    path: "/api/users",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, userType) };
        let accepted = ['userID', 'name', 'password'];
        let data = await getAllUsers(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, userType) };
        let accepted = ['userID', 'name', 'password'];
        let data = await getUser(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, userType));
        await createUser(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, userType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, userType, req.params));
        
        await updateUser(query, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await deleteUser(query);
        res.status(200).send();
      }
    ]
  }
]