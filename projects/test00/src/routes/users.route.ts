import { getAllUsers, getUser, createUser, updateUser, deleteUser, } from "../controllers/users.controller";
import { checkQuery1, verifyToken, checkBody1, acceptedBody, filterByAccept, filterByPrevent, checkValues, storeFile } from "../utilities";

let userType: UserModel = {
userID: '',
name: '',
password: '',
date: 0,
avatar: 'profile_avatars: png-jpeg',
}

export default [  {
    path: "/api/users",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'name', 'password', 'date', 'avatar'];
        let query = filterByAccept([...queryAccept, ...accept], req.query);
        checkValues(query, userType);

        let returnedFields: string[] = ['userID', 'password', 'date', 'avatar'];
        let data = await getAllUsers(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'name', 'password', 'date', 'avatar'];
        let query = filterByAccept([...queryAccept, ...accept], req.query);
        checkValues(query, userType);

        let returnedFields: string[] = ['userID', 'name', 'password', 'date', 'avatar'];
        let data = await getUser(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let acceptList: string[] = ['userID', 'name', 'password', 'date', 'avatar']        
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
        let query = { ...req.params, ...checkQuery1(req.query, userType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody1(req.body, userType, req.params));
        
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