import { getAllHistoriesFilteredByUserID, getHistorieFilteredByUserID, createHistorie, updateHistorie, deleteHistorie, } from "../controllers/histories.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let historieType: HistorieModel = {
userID: '',
historieID: '',
createdDate: 0,
modifiedDate: 0,
actionType: 0,
actionDate: 0,
bookID: '',
volumeID: '',
chapterID: '',
}

export default [  {
    path: "/api/users/:userID/histories",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'historieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'bookID', 'volumeID', 'chapterID'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, historieType);

        let returnedFields: string[] = ['userID', 'historieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'bookID', 'volumeID', 'chapterID'];
        let data = await getAllHistoriesFilteredByUserID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/histories/:historieID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['userID', 'historieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'bookID', 'volumeID', 'chapterID'];
        let data = await getHistorieFilteredByUserID({ historieID: req.params.historieID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/histories",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'historieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'bookID', 'volumeID', 'chapterID']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, historieType)

        await createHistorie(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/histories/:historieID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'historieID', 'createdDate', 'modifiedDate', 'actionType', 'actionDate', 'bookID', 'volumeID', 'chapterID']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, historieType)
        
        await updateHistorie({ historieID: req.params.historieID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/histories/:historieID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteHistorie({ historieID: req.params.historieID });
        res.status(200).send();
      }
    ]
  }
]