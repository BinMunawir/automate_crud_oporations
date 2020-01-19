        import { getToken, verifyToken, storeImage, checkBody, checkQuery, preventBody } from "../utilities";
        import { HTTP400Error } from "../models/http400error";
        import facade from "../facades";

        export async function signup(headers: any, body: any) {
    if (body.userID == null || body.password == null)
        throw new HTTP400Error(105, 'userID and password are required');
    try {
        let d = await facade.sqlStorage.sqlCreate('Users', body)
        return JSON.stringify(d);
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function login(headers: any, body: any) {
    if (body.userID == null || body.password == null)
        throw new HTTP400Error(105, 'userID and password are required');
    body = { userID: body.userID, password: body.password }
    try {
        let d = await facade.sqlStorage.sqlRead('Users', body)
        if (d.length == 0)
            throw new Error('no user by that id')
        let token = getToken(body.userID);
        d = {
            token: token,
            profile: d
        }
        return JSON.stringify(d);
    } catch (e) {
        if (e.message.includes('no user'))
            throw new HTTP400Error(107, 'username or password are incorrect')
        throw e;
    }
}
                  