import 'io.dart';

class Utilities {
  IO _io = IO();
  String _root;
  String _dir;

  Utilities(this._root) {
    this._dir = this._root + 'src/utilities/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateUtilities();
  }

  void _generateUtilities() {
    String content = '''
      import { Router, Request, Response, NextFunction } from "express";
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
        const options = { expiresIn: '1 week' };
        const secret = process.env.secretKey;
        let result = jwt.verify(token, secret, options);
        let isUser = ("'" + userID + "'" == result.userID);
        if (!isUser) throw new Error("token doesn't match");
      }

      export async function storeImage(fileName: any, image: any) {
        await new Promise((resolve, reject) => {
          image.mv(process.cwd() + '/public/images/' + fileName, async (err: any) => {
            if (err) reject(new Error('image upload failed'))
            resolve()
          })
        })
      }

      export function checkBody(body: any, type: any) {
        let dbBody: any = {}
        Object.entries(body).forEach((b) => {
          for (const i in Object.entries(type)) {
            let u = Object.entries(type)[i];
            if (b[0] == u[0] && b[1] && (""+b[1]).length > 0) {
              dbBody[b[0]] = b[1];
              continue;
            }
          }
        })
        return dbBody;
      }
      export function checkQuery(query: any, type: any) {
        let dbQuery: any = {}
        Object.entries(query).forEach((b) => {
          for (const i in Object.entries(type)) {
            let u = Object.entries(type)[i];
            if (b[0] == u[0] || b[0] == 'limit' || b[0] == 'page' || b[0] == 'sort' || b[0] == 'order') {
              dbQuery[b[0]] = b[1];
              continue;
            }
          }
        })
        return dbQuery;
      }
      export function preventBody(prevented: any, body: any) {
        let preventBody: any = {};
        prevented = prevented.split(',')
        for (const i in Object.entries(body)) {
          const b = Object.entries(body)[i];
          let isPrevented = false;
          for (const ii in prevented) {
            const p = prevented[ii];
            if (b[0] == p) {
              isPrevented = true;
              break;
            }
          }
          if (!isPrevented)
            preventBody[b[0]] = b[1];
        }
        return preventBody;
      }
    ''';

    _io.createFile(this._dir + 'index.ts');
    _io.writeFile(this._dir + 'index.ts', content);
  }
}
