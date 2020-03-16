import { getAllGlossaries, getGlossary, createGlossary, updateGlossary, deleteGlossary, } from "../controllers/glossaries.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let glossaryType: GlossaryModel = {
glossaryID: '',
createdDate: 0,
createdBy: '',
modifiedDate: 0,
term: '',
definition: '',
}

export default [  {
    path: "/api/glossaries",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['glossaryID', 'createdDate', 'createdBy', 'modifiedDate', 'term', 'definition'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, glossaryType);

        let returnedFields: string[] = ['glossaryID', 'createdDate', 'createdBy', 'modifiedDate', 'term', 'definition'];
        let data = await getAllGlossaries(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/glossaries/:glossaryID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['glossaryID', 'createdDate', 'createdBy', 'modifiedDate', 'term', 'definition'];
        let data = await getGlossary({ glossaryID: req.params.glossaryID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/glossaries",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['glossaryID', 'createdDate', 'createdBy', 'modifiedDate', 'term', 'definition']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, glossaryType)

        await createGlossary(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/glossaries/:glossaryID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['glossaryID', 'createdDate', 'createdBy', 'modifiedDate', 'term', 'definition']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, glossaryType)
        
        await updateGlossary({ glossaryID: req.params.glossaryID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/glossaries/:glossaryID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteGlossary({ glossaryID: req.params.glossaryID });
        res.status(200).send();
      }
    ]
  }
]