import { getUsers, getUser, updateUser, deleteUser } from "../controllers/users.service";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let userType: UserModel = {
  userID: '',
  password: '',
  fName: '',
  lName: '',
  phone: '',
  gender: 0,
  email: '',
  address: '',
  birthDate: 0,
  avatar: {
    mimetype: 'image',
  },
}

export default [
  {
    path: "/api/users",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, userType) };
        let accepted = ['userID', 'fName'];
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
        verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...checkQuery(req.query, userType) };
        let accepted = ['userID', 'fName', 'avatar'];
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
        verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...checkQuery(req.query, userType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, userType, req.params));
        console.log(body);
        
        // await updateUser(query, body);
        res.status(200).send();
      }
    ]
  },
  {
    path: "/api/users/:userID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await deleteUser(query);
        res.status(200).send();
      }
    ]
  },
];