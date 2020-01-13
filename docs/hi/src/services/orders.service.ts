        import { } from "../utilities";
        import { HTTP400Error } from "../models/http400error";
        import facade from "../facades";

                      export async function getOrders(params: any, query: any, headers: any) {

                  try {
                      let dbQuery = { ...params, ...query };
                      let d = await facade.sqlStorage.sqlRead('Orders', dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }

                          export async function createOrder(params: any, query: any, headers: any, body: any) {
                  try {
                      let d = await facade.sqlStorage.sqlCreate('Orders', body)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }

                          export async function getOrder(params: any, query: any, headers: any) {

                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlRead('Orders', dbQuery)
                    if (d.length() == 0)
                        throw new Error('error: there is no data by that id')
                    return JSON.stringify(d[0]);
                } catch (e) {
                    if (e.message.includes("there is no data by that id"))
                        throw new HTTP400Error(102, e.message);
                    throw e;
                }
              }

                          export async function updateOrder(params: any, query: any, headers: any, body: any) {
                  try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlUpdate('Orders', body, dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }
              
                          export async function deleteOrder(params: any, query: any, headers: any) {
                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlDelete('Orders', dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }
              
                  