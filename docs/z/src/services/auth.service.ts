import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import facade from "../facades";

export async function signup(data: any) {
    if (data.password == null)
        throw new HTTP400Error(105, 'password is required');

    try {
        await facade.sqlStorage.sqlCreate('Users', data)
    } catch (e) {
        if (e.message.includes('image upload failed'))
            throw new HTTP400Error(103, 'error: image upload failed')
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
export async function login(query: any) {
    if (query.phone == null || query.password == null)
        throw new HTTP400Error(105, 'phone and password are required');
    try {
        let d = await facade.sqlStorage.sqlRead('Users', query)
        if (d.length == 0)
            throw new Error('no user by that id')
        let token = utilities.getToken(query.userID);
        d = {
            token: token,
            profile: d
        }
        return d;
    } catch (e) {
        if (e.message.includes('no user'))
            throw new HTTP400Error(107, 'username or password are incorrect')
        throw e;
    }
}
