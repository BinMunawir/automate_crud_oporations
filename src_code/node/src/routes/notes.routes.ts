import { getNotes, getNote, updateNote, createNote, deleteNote } from "../controllers/notes.service";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";


let noteType: NoteModel = {
  userID: '',
  noteID: '',
  title: '',
  content: '',
  date: 0,
}


export default [
  {
    path: "/api/users/:userID/notes",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        verifyToken(req.params.userID, req.headers.auth)
        let query = {
          ...req.parmas, ...checkQuery(req.query, noteType
          )
        };
        let requestedData: any[] = [];
        let data = await getNotes(query, requestedData);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  },
  {
    path: "/api/users/:userID/notes",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        verifyToken(req.params.userID, req.headers.auth)
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, noteType));
        await createNote(body);
        res.status(200).send();
      }
    ]
  },
  {
    path: "/api/users/:userID/notes/:noteID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.parmas, ...checkQuery(req.query, noteType) };
        let requestedData: any[] = [];
        let data = await getNote(query, requestedData);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  },
  {
    path: "/api/users/:userID/notes/:noteID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.parmas, ...checkQuery(req.query, noteType) };
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, noteType));
        await updateNote(query, body);
        res.status(200).send();
      }
    ]
  },
  {
    path: "/api/users/:userID/notes/:noteID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.parmas, ...checkQuery(req.query, noteType) };
        await deleteNote(query);
        res.status(200).send();
      }
    ]
  },
];