import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";
import { signup, login, } from "../services/auth.service";

let type: UserModel =
  { userID: '', password: '', name: '', data: 0, avatar: { mimetype: 'image', } }
export default [
  {
    path: "/api/auth/signup",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let accepted: string[] = ['userID', 'password', 'name', 'data', 'avatar',]
        let body = acceptedBody(accepted, await checkBody(req.body, type, req.params));
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
        let accepted: string[] = ['userID', 'password',]
        let body = acceptedBody(accepted, await checkBody(req.body, type, req.params));
        let data = await login(body);
        res.status(200).send(data);
      }
    ]
  },

];
