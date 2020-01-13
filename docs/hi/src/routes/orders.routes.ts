      import { Request, Response } from "express";
      import { getOrders, createOrder, getOrder, updateOrder, deleteOrder,  } from "../services/orders.service";

      export default [ 
                  {
            path: "/users/:userID/orders",
            method: "get",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getOrders(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/users/:userID/orders",
            method: "post",
            handler: [
              async (req: Request, res: Response) => {
                          await createOrder(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/users/:userID/orders/:orderID",
            method: "get",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getOrder(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/users/:userID/orders/:orderID",
            method: "put",
            handler: [
              async (req: Request, res: Response) => {
                          await updateOrder(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/users/:userID/orders/:orderID",
            method: "delete",
            handler: [
              async (req: Request, res: Response) => {
                          await deleteOrder(req.params, req.query, req.headers);
          res.status(200).send();
                        }
            ]
          },

                ];
      