import { getAllInquiriesFilteredByUserID, getAllInquiriesFilteredByDocumentID, getAllInquiriesFilteredByUserIDAndDocumentID, getInquiryFilteredByUserIDAndDocumentID, createInquiry, updateInquiry, deleteInquiry, } from "../controllers/inquiries.controller";
import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";

let inquiryType: InquiryModel = {
userID: '',
bookID: '',
volumeID: '',
chapterID: '',
documentID: '',
inquiryID: '',
createdDate: 0,
modifiedDate: 0,
inquiry: '',
response: '',
status: 0,
}

export default [  {
    path: "/api/users/:userID/inquiries",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, inquiryType);

        let returnedFields: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status'];
        let data = await getAllInquiriesFilteredByUserID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/documents/:documentID/inquiries",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, inquiryType);

        let returnedFields: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status'];
        let data = await getAllInquiriesFilteredByDocumentID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/inquiries",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status'];
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, inquiryType);

        let returnedFields: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status'];
        let data = await getAllInquiriesFilteredByUserIDAndDocumentID(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/inquiries/:inquiryID",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status'];
        let data = await getInquiryFilteredByUserIDAndDocumentID({ inquiryID: req.params.inquiryID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/inquiries",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, inquiryType)

        await createInquiry(body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/inquiries/:inquiryID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ['userID', 'bookID', 'volumeID', 'chapterID', 'documentID', 'inquiryID', 'createdDate', 'modifiedDate', 'inquiry', 'response', 'status']
        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, inquiryType)
        
        await updateInquiry({ inquiryID: req.params.inquiryID }, body);
        res.status(200).send();
      }
    ]
  }
,   {
    path: "/api/users/:userID/documents/:documentID/inquiries/:inquiryID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await deleteInquiry({ inquiryID: req.params.inquiryID });
        res.status(200).send();
      }
    ]
  }
]