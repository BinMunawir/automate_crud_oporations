import { getAllUsers, getUser, createUser, updateUser, deleteUser, } from "../controllers/users.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody, filterByAccept, filterByPrevent, checkValues, storeFile } from "../utilities";

let userType: UserModel = {
userID: '',
password: '',
date: 0,
avatar: 'profile_avatars: png-jpeg',
}

export default [  {
    path: "/api/users",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, userType) };
        let accepted = ['userID', 'password', 'date', 'avatar'];
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
        let accepted = ['userID', 'password', 'date', 'avatar'];
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
        let acceptList: string[] = ['userID', 'password', 'date', 'avatar']        
        let body = filterByAccept(acceptList, req.body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, req.body);
        checkValues(body, userType)
        body = { ...req.params, ...body };
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