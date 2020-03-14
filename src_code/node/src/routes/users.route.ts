import { getAllUsers, getUser, createUser, updateUser, deleteUser, } from "../controllers/users.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody, fielteredByAccept, fielteredByPrevent, checkValues } from "../utilities";
import { type } from "os";

let userType: UserModel = {
  userID: '',
  name: '',
  password: '',
  date: 0,
  avatar: 'image',
}

export default [
  {
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
  , {
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
  , {
    path: "/api/users",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let acceptList: string[] = ['userID', 'date', 'avatar']
        // console.log(req.body);
        let body = fielteredByAccept(acceptList, req.body)
        // console.log(body);
        let preventList: string[] = ['password']
        body = fielteredByPrevent(preventList, body)
        console.log(body);
        checkValues(body, userType)
        // await createUser(req.body);
        res.status(200).send();
      }
    ]
  }
  , {
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
  , {
    path: "/api/users/:userID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params };
        await deleteUser(query);
        res.status(200).send();
      }
    ]
  }
]