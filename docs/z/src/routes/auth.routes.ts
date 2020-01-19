import * as utilities from "../utilities";
      import { signup, login,  } from "../services/auth.service";

                      let type: UserModel = 
              {userID: '', password: '', name: '', date: 0, avatar: {mimetype: 'image',}}            
      export default [ 
                  {
            path: "/api/auth/signup",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                        let accepted: string[] = ['userID', 'password', 'name', 'date', 'avatar', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.body));
        await signup(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/auth/login",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                        let accepted: string[] = ['userID', 'password', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type));
        let data = await login(body);
        res.status(200).send(data);
                        }
            ]
          },

                ];
      