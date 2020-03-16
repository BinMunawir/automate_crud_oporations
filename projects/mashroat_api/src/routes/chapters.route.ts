import { getAllChaptersFilteredByVolumeID, getChapterFilteredByVolumeID, createChapter, updateChapter, deleteChapter, } from "../controllers/chapters.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let chapterType: ChapterModel = {
bookID: '',
volumeID: '',
chapterID: '',
createdDate: 0,
createdBy: '',
modifiedDate: 0,
modifiedBy: '',
arTitle: '',
enTitle: '',
code: '',
versionNumber: 0,
versionDate: 0,
numberOfViews: 0,
chapter: 'chapters: docx',
}

export default [  {
    path: "/api/books/:bookID/volumes/:volumeID/chapters",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['bookID', 'volumeID', 'chapterID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'numberOfViews', 'chapter'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, chapterType);

        let returnedFields: string[] = ['bookID', 'volumeID', 'chapterID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'numberOfViews', 'chapter'];
        let data = await getAllChaptersFilteredByVolumeID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID/chapters/:chapterID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['bookID', 'volumeID', 'chapterID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'numberOfViews', 'chapter'];
        let data = await getChapterFilteredByVolumeID({ chapterID: req.params.chapterID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID/chapters",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['bookID', 'volumeID', 'chapterID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'numberOfViews', 'chapter']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, chapterType)

        await createChapter(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID/chapters/:chapterID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['bookID', 'volumeID', 'chapterID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'versionDate', 'numberOfViews', 'chapter']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, chapterType)
        
        await updateChapter({ chapterID: req.params.chapterID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID/volumes/:volumeID/chapters/:chapterID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteChapter({ chapterID: req.params.chapterID });
        res.status(200).send();
      }
    ]
  }
]