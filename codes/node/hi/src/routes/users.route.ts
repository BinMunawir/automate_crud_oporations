import { getAllUsers, getUser, createUser, updateUser, deleteUser, } from "../controllers/users.controller";
import { checkQuery1, verifyToken, checkBody1, acceptedBody, filterByAccept, filterByPrevent, checkValues, storeFile } from "../utilities";

let userType: UserModel = {
userID: '',
name: '',
password: '',
date: 0,
avatar: 'profile_avatars: png-jpeg-jpg',
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
        query = { ...req.params, ...query }

        let returnedFields: string[] = ['userID', 'name', 'password', 'date', 'avatar'];
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
        let returnedFields: string[] = ['userID', 'name', 'password', 'date', 'avatar'];
        let data = await getUser({ userID: req.params.userID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = { ...req.params, ...req.body };
        let acceptList: string[] = ['userID', 'name', 'password', 'date', 'avatar']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, userType)

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
        let body = { ...req.params, ...req.body };
        let acceptList: string[] = ['userID', 'name', 'password', 'date', 'avatar']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, userType)
        
        await updateUser({ userID: req.params.userID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteUser({ userID: req.params.userID });
        res.status(200).send();
      }
    ]
  }
]