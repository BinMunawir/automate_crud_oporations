import { getRules, } from "../controllers/rules.controller";
import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";

let ruleType: ruleModel = {
userID: '',
adminID: '',
ruleID: '',
name: '',
password: '',
}

export default [  {
    path: "/rules",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, ruleType) };
        let accepted = ['name', 'password'];
        let data = await getRules(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
]