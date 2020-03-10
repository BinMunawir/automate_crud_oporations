import { getAllAdmins, getAdmin, createAdmin, updateAdmin, deleteAdmin, } from "../controllers/admins.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let adminType: adminModel = {
adminID: '',
name: '',
password: '',
}

export default [  {
    path: "/api/admins",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, adminType) };
        let accepted = ['adminID', 'name', 'password'];
        let data = await getAllAdmins(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/admins/:adminID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, adminType) };
        let accepted = ['adminID', 'name', 'password'];
        let data = await getAdmin(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/admins",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, adminType));
        await createAdmin(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/admins/:adminID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, adminType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, adminType, req.params));
        
        await updateAdmin(query, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/admins/:adminID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await deleteAdmin(query);
        res.status(200).send();
      }
    ]
  }
]