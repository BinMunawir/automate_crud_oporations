import { getAllGroups, getGroup, createGroup, updateGroup, deleteGroup, } from "../controllers/groups.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let groupType: groupModel = {
groupID: '',
title: '',
}

export default [  {
    path: "/api/groups",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, groupType) };
        let accepted = ['groupID', 'title'];
        let data = await getAllGroups(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/groups/:groupID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, groupType) };
        let accepted = ['groupID', 'title'];
        let data = await getGroup(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/groups",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, groupType));
        await createGroup(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/groups/:groupID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, groupType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, groupType, req.params));
        
        await updateGroup(query, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/groups/:groupID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await deleteGroup(query);
        res.status(200).send();
      }
    ]
  }
]