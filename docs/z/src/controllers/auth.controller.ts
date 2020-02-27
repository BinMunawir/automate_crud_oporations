import * as utilities from "../utilities";
import { HTTP400Error } from "../models/http400error";
const shortid = require('shortid');
import services from "../services";

            let userType: UserModel = 
              {userID: '', password: '', name: '', email: '', phone: '', status: 0, lastActivity: 0, organizationID: '', addedDate: 0}          
                        let adminType: AdminModel = 
              {adminID: '', name: '', password: '', role: '', email: '', addedDate: 0, lastActivity: 0, status: 0}          
            
export async function signup(data: any) {
if (data.authType == 'Users') {
        if (data.email == null || data.password == null )
            throw new HTTP400Error(1614, 'email and password are required');

        let accepted: string[] = ['userID', 'password', 'name', 'email', 'phone', 'status', 'lastActivity', 'organizationID', 'addedDate'];
         let userData = utilities.acceptedBody(accepted, data);
        if (userData.userID == null) userData.userID = shortid.generate();
        userData = await utilities.checkBody(userData, userType, userData);
        return await exceuteSignup(data.authType, userData);
    }

      if (data.authType == 'Admins') {
        if (data.userID == null || data.password == null )
            throw new HTTP400Error(1614, 'userID and password are required');

        let accepted: string[] = ['adminID', 'name', 'password', 'role', 'email', 'addedDate', 'lastActivity', 'status'];
         let adminData = utilities.acceptedBody(accepted, data);
        if (adminData.adminID == null) adminData.adminID = shortid.generate();
        adminData = await utilities.checkBody(adminData, adminType, adminData);
        return await exceuteSignup(data.authType, adminData);
    }

          throw new HTTP400Error(5461, 'the auth type is not supported');
}
async function exceuteSignup(table: any, data: any) {
    try {
        await services.sqlStorage.sqlCreate(table, data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}

export async function login(query: any, authTypes: any[]): Promise<any> {
    if (!authTypes.toString().includes(query.authType) && query.authType != 'Any')
        throw new HTTP400Error(5461, 'the auth type is not supported');
    if (query.id == null || query.password == null)
        throw new HTTP400Error(105, 'user id and password are required');

    if (query.authType == 'Any') {
        for (let i = 0; i < authTypes.length; i++) {
            const table = authTypes[i];
            let newQuery = query;
            newQuery.authType = table;
            try {
                return await login(newQuery, authTypes);
            } catch (e) {
                if (!e.message.includes('No user'))
                    throw e;
            }
        }
        throw new HTTP400Error(6541, 'No user by that information in all types');
    }
    else if (query.authType == 'Users') {
        query = { email: query.id, password: query.password }
          let requestedData: any = ['userID', 'password', 'name', 'email', 'phone', 'status', 'lastActivity', 'organizationID', 'addedDate'];
        return await exceuteLogin('Users', query, requestedData)
    }

    else if (query.authType == 'Admins') {
        query = { userID: query.id, password: query.password }
          let requestedData: any = ['adminID', 'name', 'password', 'role', 'email', 'addedDate', 'lastActivity', 'status'];
        return await exceuteLogin('Admins', query, requestedData)
    }

}
async function exceuteLogin(table: any, query: any, requestedData: any) {
    try {
        let d = await services.sqlStorage.sqlRead(table, query, requestedData)
        if (d.length == 0)
            throw new HTTP400Error(1075, 'No user by that information')
        let token = utilities.getToken(d[0][Object.entries(d[0])[0][0]]);
        d = {
            token: token,
            profile: d
        }
        return d;
    } catch (e) {
        throw e;
    }
}

        