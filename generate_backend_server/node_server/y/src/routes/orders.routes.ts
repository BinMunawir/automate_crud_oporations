      import { Request, Response } from "express";
      import { getOrders, createOrder, getOrder, updateOrder, deleteOrder,  } from "../services/orders.service";

      export default [ 
                  {
            path: "/api/users/:userID/orders",
            method: "GET",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getOrders(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/api/users/:userID/orders",
            method: "POST",
            handler: [
              async (req: Request, res: Response) => {
                          await createOrder(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/orders/:orderID",
            method: "GET",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getOrder(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/api/users/:userID/orders/:orderID",
            method: "PUT",
            handler: [
              async (req: Request, res: Response) => {
                          await updateOrder(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/orders/:orderID",
            method: "DELETE",
            handler: [
              async (req: Request, res: Response) => {
                          await deleteOrder(req.params, req.query, req.headers);
          res.status(200).send();
                        }
            ]
          },

                ];
      