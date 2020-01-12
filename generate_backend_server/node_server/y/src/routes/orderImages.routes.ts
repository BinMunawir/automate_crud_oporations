      import { Request, Response } from "express";
      import { getOrderImages, createOrderImage, getOrderImage, updateOrderImage, deleteOrderImage,  } from "../services/orderImages.service";

      export default [ 
                  {
            path: "/api/users/:userID/orders/:orderID/orderImages",
            method: "GET",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getOrderImages(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/api/users/:userID/orders/:orderID/orderImages",
            method: "POST",
            handler: [
              async (req: Request, res: Response) => {
                          await createOrderImage(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/orders/:orderID/orderImages/:orderImageID",
            method: "GET",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getOrderImage(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/api/users/:userID/orders/:orderID/orderImages/:orderImageID",
            method: "PUT",
            handler: [
              async (req: Request, res: Response) => {
                          await updateOrderImage(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/users/:userID/orders/:orderID/orderImages/:orderImageID",
            method: "DELETE",
            handler: [
              async (req: Request, res: Response) => {
                          await deleteOrderImage(req.params, req.query, req.headers);
          res.status(200).send();
                        }
            ]
          },

                ];
      