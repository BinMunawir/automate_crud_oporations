import { getAllVolumesFilteredByBookID, getVolumeFilteredByBookID, createVolume, updateVolume, deleteVolume, } from "../controllers/volumes.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let volumeType: VolumeModel = {
bookID: '',
volumeID: '',
createdDate: 0,
createdBy: '',
modifiedDate: 0,
modifiedBy: '',
arTitle: '',
enTitle: '',
versionNumber: 0,
}

export default [  {
    path: "/api/books/:bookID/volumes",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['bookID', 'volumeID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'versionNumber'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, volumeType);

        let returnedFields: string[] = ['bookID', 'volumeID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'versionNumber'];
        let data = await getAllVolumesFilteredByBookID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['bookID', 'volumeID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'versionNumber'];
        let data = await getVolumeFilteredByBookID({ volumeID: req.params.volumeID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['bookID', 'volumeID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'versionNumber']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, volumeType)

        await createVolume(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['bookID', 'volumeID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'versionNumber']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, volumeType)
        
        await updateVolume({ volumeID: req.params.volumeID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteVolume({ volumeID: req.params.volumeID });
        res.status(200).send();
      }
    ]
  }
]