        import { } from "../utilities";
        import { HTTP400Error } from "../models/http400error";
        import facade from "../facades";

                      export async function getOrderImages(params: any, query: any, headers: any) {

                  try {
                      let dbQuery = { ...params, ...query };
                      let d = await facade.sqlStorage.sqlRead('OrderImages', dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }

                          export async function createOrderImage(params: any, query: any, headers: any, body: any) {
                  try {
                      let d = await facade.sqlStorage.sqlCreate('OrderImages', body)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }

                          export async function getOrderImage(params: any, query: any, headers: any) {

                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlRead('OrderImages', dbQuery)
                    if (d.length() == 0)
                        throw new Error('error: there is no data by that id')
                    return JSON.stringify(d[0]);
                } catch (e) {
                    if (e.message.includes("there is no data by that id"))
                        throw new HTTP400Error(102, e.message);
                    throw e;
                }
              }

                          export async function updateOrderImage(params: any, query: any, headers: any, body: any) {
                  try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlUpdate('OrderImages', body, dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }
              
                          export async function deleteOrderImage(params: any, query: any, headers: any) {
                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlDelete('OrderImages', dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }
              
                  