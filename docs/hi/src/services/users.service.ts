        import { } from "../utilities";
        import { HTTP400Error } from "../models/http400error";
        import facade from "../facades";

                      export async function getUsers(params: any, query: any, headers: any) {

                  try {
                      let dbQuery = { ...params, ...query };
                      let d = await facade.sqlStorage.sqlRead('Users', dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }

                          export async function createUser(params: any, query: any, headers: any, body: any) {
                  try {
                      let d = await facade.sqlStorage.sqlCreate('Users', body)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }

                          export async function getUser(params: any, query: any, headers: any) {

                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlRead('Users', dbQuery)
                    if (d.length() == 0)
                        throw new Error('error: there is no data by that id')
                    return JSON.stringify(d[0]);
                } catch (e) {
                    if (e.message.includes("there is no data by that id"))
                        throw new HTTP400Error(102, e.message);
                    throw e;
                }
              }

                          export async function updateUser(params: any, query: any, headers: any, body: any) {
                  try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlUpdate('Users', body, dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }
              
                          export async function deleteUser(params: any, query: any, headers: any) {
                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlDelete('Users', dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }
              
                  