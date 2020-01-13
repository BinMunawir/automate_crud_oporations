      import { Request, Response } from "express";
      import { getOrderImages, createOrderImage, getOrderImage, updateOrderImage, deleteOrderImage,  } from "../services/orderImages.service";

      export default [ 
                  {
            path: "/users/:userID/orders/:orderID/orderImages",
            method: "get",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getOrderImages(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/users/:userID/orders/:orderID/orderImages",
            method: "post",
            handler: [
              async (req: Request, res: Response) => {
                          await createOrderImage(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/users/:userID/orders/:orderID/orderImages/:orderImageID",
            method: "get",
            handler: [
              async (req: Request, res: Response) => {
                          let data = await getOrderImage(req.params, req.query, req.headers);
          res.status(200).send(data);
                        }
            ]
          },

                    {
            path: "/users/:userID/orders/:orderID/orderImages/:orderImageID",
            method: "put",
            handler: [
              async (req: Request, res: Response) => {
                          await updateOrderImage(req.params, req.query, req.headers, req.body);
          res.status(200).send();
                        }
            ]
          },

                    {
            path: "/users/:userID/orders/:orderID/orderImages/:orderImageID",
            method: "delete",
            handler: [
              async (req: Request, res: Response) => {
                          await deleteOrderImage(req.params, req.query, req.headers);
          res.status(200).send();
                        }
            ]
          },

                ];
      