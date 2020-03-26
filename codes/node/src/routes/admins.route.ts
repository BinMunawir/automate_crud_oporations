import { getAllAdmins, getAdmin, createAdmin, updateAdmin, deleteAdmin, } from "../controllers/admins.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let adminType: AdminModel = {
  adminID: '',
  createdDate: 0,
  modifiedDate: 0,
  name: '',
  password: '',
  role: '',
  email: '',
  status: 0,
}

export default [
  {
    path: "/api/admins",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.query, ...req.params }
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['adminID', 'createdDate', 'modifiedDate', 'name', 'password', 'role', 'email', 'status'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, adminType);

        let returnedFields: string[] = ['adminID', 'createdDate', 'modifiedDate', 'name', 'password', 'role', 'email', 'status'];
        let data = await getAllAdmins(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
  , {
    path: "/api/admins/:adminID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['adminID', 'createdDate', 'modifiedDate', 'name', 'password', 'role', 'email', 'status'];
        let data = await getAdmin({ adminID: req.params.adminID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
  , {
    path: "/api/admins",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = { ...req.body, ...req.params };
        let acceptList: string[] = ['adminID', 'createdDate', 'modifiedDate', 'name', 'password', 'role', 'email', 'status']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, adminType)

        await createAdmin(body);
        res.status(200).send();
      }
    ]
  }
  , {
    path: "/api/admins/:adminID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = { ...req.body, ...req.params };
        let acceptList: string[] = ['adminID', 'createdDate', 'modifiedDate', 'name', 'password', 'role', 'email', 'status']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, adminType)

        await updateAdmin({ adminID: req.params.adminID }, body);
        res.status(200).send();
      }
    ]
  }
  , {
    path: "/api/admins/:adminID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteAdmin({ adminID: req.params.adminID });
        res.status(200).send();
      }
    ]
  }
]