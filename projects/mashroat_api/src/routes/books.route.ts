import { getAllBooks, getBook, createBook, updateBook, deleteBook, } from "../controllers/books.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let bookType: BookModel = {
bookID: '',
createdDate: 0,
createdBy: '',
modifiedDate: 0,
modifiedBy: '',
arTitle: '',
enTitle: '',
code: '',
versionNumber: 0,
video: 'videos: mp4',
}

export default [  {
    path: "/api/books",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['bookID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'video'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, bookType);

        let returnedFields: string[] = ['bookID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'video'];
        let data = await getAllBooks(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['bookID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'video'];
        let data = await getBook({ bookID: req.params.bookID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['bookID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'video']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, bookType)

        await createBook(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['bookID', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy', 'arTitle', 'enTitle', 'code', 'versionNumber', 'video']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, bookType)
        
        await updateBook({ bookID: req.params.bookID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteBook({ bookID: req.params.bookID });
        res.status(200).send();
      }
    ]
  }
]