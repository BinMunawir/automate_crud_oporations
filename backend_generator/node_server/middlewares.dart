import '../../io.dart';

class MiddleWares {
  IO _io = IO();
  String _root;
  String _dir;

  MiddleWares(this._root) {
    this._dir = this._root + 'src/middlewares/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateCommon();
    this._generateErrorHandlers();
    this._generateStatics();
  }

  void _generateCommon() {
    String content = '''
import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
const fileupload = require('express-fileupload')

const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

const handleCompression = (router: Router) => {
  router.use(compression());
};

const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(fileupload());
  router.use(parser.json());
  router.use('/api', function (req: any, res, next) {
    if (req.url == '/' || req.url.includes('swagger')) {
      next();
      return;
    }
    req.headers["accept"] = 'application/json';
    req.headers["content-type"] = 'application/json';
    if (req.files != null) {
      req.headers["content-type"] = 'multipart/form-data';
      Object.entries(req.files).forEach(f => req.body[f[0]] = f[1]);
    }
    res.setHeader('content-type', 'application/json')
    next()
  });
};

export default [
  handleCors,
  handleCompression,
  handleBodyRequestParsing,
]
    ''';

    _io.createFile(this._dir + 'common.ts');
    _io.writeFile(this._dir + 'common.ts', content);
  }

  void _generateErrorHandlers() {
    String content = '''
      import { Request, Response, NextFunction, Router } from "express";
      import { HTTP400Error } from "../models/http400error";

      const handle404Error = (router: Router) => {
          router.use((req: Request, res: Response) => {
              res.setHeader('content-type', 'application/json')
              res.status(404).send("Source not found");
          });
      };

      const handleClientError = (router: Router) => {
          router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
              if (err instanceof HTTP400Error) {
                  console.warn(err);
                  res.setHeader('content-type', 'application/json')
                  res.status(400).send(JSON.stringify(err));
              } else {
                  next(err);
              }
          });
      };

      const handleServerError = (router: Router) => {
          router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
              console.error(err);
              res.setHeader('content-type', 'application/json')
              if (process.env.NODE_ENV === "production") {
                  res.status(500).send("Internal Server Error");
              } else {
                  res.status(500).send(err.stack);
              }
          });
      };

      export default [
          handleClientError,
          handleServerError,
          handle404Error,
      ]
    ''';

    _io.createFile(this._dir + 'errorHandlers.ts');
    _io.writeFile(this._dir + 'errorHandlers.ts', content);
  }

  void _generateStatics() {
    String content = '''
      import { Router } from "express";
      import express from "express";
      import swaggerUi from "swagger-ui-express";
      import swaggerDocument from "../config/swagger.json";

      export const handleResources = (router: Router) =>
          router.use('/public', express.static('public'));


      export const handleSwagger = (router: Router) =>
          router.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


      export default [
          handleSwagger,
          handleResources,
      ]
    ''';

    _io.createFile(this._dir + 'statics.ts');
    _io.writeFile(this._dir + 'statics.ts', content);
  }
}
