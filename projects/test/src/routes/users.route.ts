import { getAllUsers, getUser, createUser, updateUser, deleteUser, } from "../controllers/users.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let userType: UserModel = {
userID: '',
email: '',
phone: '',
}

export default [  {
    path: "/api/users",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'email', 'phone'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, userType);

        let returnedFields: string[] = ['userID', 'email', 'phone'];
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
        let returnedFields: string[] = ['userID', 'email', 'phone'];
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
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'email', 'phone']
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
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'email', 'phone']
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