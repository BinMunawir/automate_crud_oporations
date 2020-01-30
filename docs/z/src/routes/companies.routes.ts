import * as utilities from "../utilities";
      import { getCompanies, createCompanies, getCompany, updateCompany, deleteCompany,  } from "../controllers/companies.controller";

                      let type: CompanyModel = 
              {companyID: '', password: '', email: '', phone: '', title: ''}            
      export default [ 
                  {
            path: "/api/companies",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['companyID', 'password', 'email', 'phone', 'title', ];
        let data = await getCompanies(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/companies",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                        let accepted: string[] = ['companyID', 'password', 'email', 'phone', 'title', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createCompanies(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/companies/:companyID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.companyID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['companyID', 'password', 'email', 'phone', 'title', ];
        let data = await getCompany(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/companies/:companyID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.companyID, req.headers.auth)
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['companyID', 'password', 'email', 'phone', 'title', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateCompany(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/companies/:companyID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                utilities.verifyToken(req.params.companyID, req.headers.auth)
        let query = { ...req.params};
        await deleteCompany(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      