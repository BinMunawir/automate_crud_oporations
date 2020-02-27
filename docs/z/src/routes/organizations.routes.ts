import * as utilities from "../utilities";
      import { getOrganizations, createOrganizations, getOrganization, updateOrganization, deleteOrganization,  } from "../controllers/organizations.controller";

                      let type: OrganizationModel = 
              {organizationID: '', arabicName: '', englishName: '', domain: '', type: ''}            
      export default [ 
                  {
            path: "/api/organizations",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['organizationID', 'arabicName', 'englishName', 'domain', 'type', ];
        let data = await getOrganizations(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/organizations",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                        let accepted: string[] = ['organizationID', 'arabicName', 'englishName', 'domain', 'type', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createOrganizations(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/organizations/:organizationID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['organizationID', 'arabicName', 'englishName', 'domain', 'type', ];
        let data = await getOrganization(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/organizations/:organizationID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['organizationID', 'arabicName', 'englishName', 'domain', 'type', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateOrganization(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/organizations/:organizationID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params};
        await deleteOrganization(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      