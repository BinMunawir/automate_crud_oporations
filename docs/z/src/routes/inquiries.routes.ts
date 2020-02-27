import * as utilities from "../utilities";
      import { getInquiries, createInquiries, getInquiry, updateInquiry, deleteInquiry,  } from "../controllers/inquiries.controller";

                      let type: InquiryModel = 
              {inquiryID: '', organizationID: '', userID: '', inquiry: '', response: '', status: 0, adminID: 0}            
      export default [ 
                  {
            path: "/api/users/:userID/inquiries",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['inquiryID', 'organizationID', 'userID', 'inquiry', 'response', 'status', 'adminID', ];
        let data = await getInquiries(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/users/:userID/inquiries",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let accepted: string[] = ['inquiryID', 'organizationID', 'userID', 'inquiry', 'response', 'status', 'adminID', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createInquiries(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/inquiries/:inquiryID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['inquiryID', 'organizationID', 'userID', 'inquiry', 'response', 'status', 'adminID', ];
        let data = await getInquiry(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/users/:userID/inquiries/:inquiryID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['inquiryID', 'organizationID', 'userID', 'inquiry', 'response', 'status', 'adminID', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateInquiry(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/inquiries/:inquiryID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.userID, req.headers.auth)
        let query = { ...req.params};
        await deleteInquiry(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      