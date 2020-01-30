import * as utilities from "../utilities";
      import { getOffers, createOffers, getOffer, updateOffer, deleteOffer,  } from "../controllers/offers.controller";

                      let type: OfferModel = 
              {offerID: '', content: ''}            
      export default [ 
                  {
            path: "/api/offers",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['offerID', 'content', ];
        let data = await getOffers(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/offers",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                        let accepted: string[] = ['offerID', 'content', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createOffers(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/offers/:offerID",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['offerID', 'content', ];
        let data = await getOffer(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/offers/:offerID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['offerID', 'content', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateOffer(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/offers/:offerID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params};
        await deleteOffer(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      