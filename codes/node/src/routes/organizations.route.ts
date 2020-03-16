import { getAllOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization, } from "../controllers/organizations.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let organizationType: OrganizationModel = {
organizationID: '',
createdDate: 0,
arTitle: '',
enTitle: '',
code: '',
email: '',
domain: '',
type: '',
}

export default [  {
    path: "/api/organizations",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['organizationID', 'createdDate', 'arTitle', 'enTitle', 'code', 'email', 'domain', 'type'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, organizationType);

        let returnedFields: string[] = ['organizationID', 'createdDate', 'arTitle', 'enTitle', 'code', 'email', 'domain', 'type'];
        let data = await getAllOrganizations(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/organizations/:organizationID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['organizationID', 'createdDate', 'arTitle', 'enTitle', 'code', 'email', 'domain', 'type'];
        let data = await getOrganization({ organizationID: req.params.organizationID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/organizations",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['organizationID', 'createdDate', 'arTitle', 'enTitle', 'code', 'email', 'domain', 'type']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, organizationType)

        await createOrganization(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/organizations/:organizationID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['organizationID', 'createdDate', 'arTitle', 'enTitle', 'code', 'email', 'domain', 'type']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, organizationType)
        
        await updateOrganization({ organizationID: req.params.organizationID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/organizations/:organizationID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteOrganization({ organizationID: req.params.organizationID });
        res.status(200).send();
      }
    ]
  }
]