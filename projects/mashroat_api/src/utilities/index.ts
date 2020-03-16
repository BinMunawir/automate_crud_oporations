import { Router, Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../models/http400error";
const jwt = require('jsonwebtoken')

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    (router as any)[route.method](route.path, route.handler);
  }
};

export function getToken(userID: any): string {
  const payload = { userID: userID };
  const options = { expiresIn: '1 week' };
  const secret = process.env.secretKey;
  return jwt.sign(payload, secret, options);
}

export function verifyToken(userID: any, token: string) {
  try {
    const options = { expiresIn: '1 week' };
    const secret = process.env.secretKey;
    let result = jwt.verify(token, secret, options);
    let isUser = ("'" + userID + "'" == result.userID);
    if (!isUser) throw '';
  } catch (e) {
    throw new HTTP400Error(101, "error: you are not authorized to this endpoint");
  }
}

export async function storeFile(file: any, path: string) {
  path = path + file.name.substring(file.name.lastIndexOf('.'))
  await new Promise((resolve, reject) => {
    file.mv(
      process.cwd() + '/public/' + path,
      (err: any) => {
        if (err) throw new HTTP400Error(1111, 'file upload field');
        resolve()
      });
  })
  return process.env.storageHost + '/public/' + path;
}

export function acceptedBody(acceptedBody: any[], body: any) {
  let newBody: any = {};
  for (const i in Object.entries(body)) {
    const b = Object.entries(body)[i];
    let isAccepted = false;
    for (const ii in acceptedBody) {
      const a = acceptedBody[ii];
      if (b[0] == a) {
        isAccepted = true;
        break;
      }
    }
    if (isAccepted)
      newBody[b[0]] = b[1];
  }
  return newBody;
}

export function filterByAccept(accept: any[], list: any) {
  let newList: any = {}
  accept.forEach(a => {
    for (const i in Object.entries(list)) {
      const l = Object.entries(list)[i];
      if (a == l[0]) {
        newList[l[0]] = l[1];
        return;
      }
    }
  })
  return newList;
}

export function filterByPrevent(prevent: any[], list: any) {
  let newList: any = {}
  for (const i in Object.entries(list)) {
    const l = Object.entries(list)[i];
    let isprevented = false;
    for (const k in prevent) {
      const p = prevent[k];
      if (p == l[0]) {
        isprevented = true;
        break
      }
    }
    if (!isprevented) newList[l[0]] = l[1];
  }
  return newList;
}

export function checkValues(list: any, type: any) {
  for (const i in Object.entries(list)) {
    const e: any = Object.entries(list)[i];
    if (e[0] == 'limit' || e[0] == 'page' || e[0] == 'sort' || e[0] == 'order') {
      checkQueryValue(e, type);
      continue;
    }
    if (typeof e[1] == typeof type[e[0]]) continue;
    if (parseInt(e[1]).toString() != 'NaN') continue;
    if (type[e[0]].length > 1) {
      let types = type[e[0]].split(':')[1].trim();
      if (!e[1].mimetype || !type[e[0]].includes(e[1].name.substring(e[1].name.lastIndexOf('.') + 1)))
        throw new HTTP400Error(1111, 'the file ' + e[0] + ' should be one of these types [' + types + '] types');
      continue;
    }
    throw new HTTP400Error(1111, 'the value of ' + e[0] + ' is not ' + typeof type[e[0]]);

  }
}

function checkQueryValue(q: any, type: any) {
  if (q[0] == 'limit' || q[0] == 'page')
    if (parseInt(q[1]).toString() == 'NaN')
      throw new HTTP400Error(1111, 'the value of ' + q[0] + ' should be a number');
  if (q[0] == 'sort') {
    let fields = q[1].split(',');
    fields.forEach((f: any) => {
      f = f.trim()
      if (type[f] == undefined) throw new HTTP400Error(1111, 'sort containts a ' + f + ' which is not accepted');
    });
  }
  if (q[0] == 'order')
    if (q[1] != 'ASC' && q[1] != 'DESC')
      throw new HTTP400Error(1111, 'the order value should be ethier ASC or DESC');
}