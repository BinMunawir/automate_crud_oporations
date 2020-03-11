import { getAllBooks, getBook, createBook, updateBook, deleteBook, } from "../controllers/books.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let bookType: BookModel = {
bookID: '',
title: '',
}

export default [  {
    path: "/api/books",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, bookType) };
        let accepted = ['bookID', 'title'];
        let data = await getAllBooks(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books/:bookID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, bookType) };
        let accepted = ['bookID', 'title'];
        let data = await getBook(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/books",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, bookType));
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
        let query = { ...req.params, ...checkQuery(req.query, bookType) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, bookType, req.params));
        
        await updateBook(query, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/books/:bookID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await deleteBook(query);
        res.status(200).send();
      }
    ]
  }
]