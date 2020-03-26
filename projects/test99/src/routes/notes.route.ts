import { getAllNotesFilteredByUserID, getNoteFilteredByUserID, createNote, updateNote, deleteNote, } from "../controllers/notes.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let noteType: NoteModel = {
userID: '',
noteID: '',
}

export default [  {
    path: "/api/users/:userID/notes",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'noteID'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, noteType);

        let returnedFields: string[] = ['userID', 'noteID'];
        let data = await getAllNotesFilteredByUserID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['userID', 'noteID'];
        let data = await getNoteFilteredByUserID({ noteID: req.params.noteID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'noteID']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, noteType)

        await createNote(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'noteID']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, noteType)
        
        await updateNote({ noteID: req.params.noteID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/notes/:noteID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteNote({ noteID: req.params.noteID });
        res.status(200).send();
      }
    ]
  }
]