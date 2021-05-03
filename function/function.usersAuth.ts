import { executeQueryModel } from "../middleware/middleware.pg";

export class UsersAuthFunction {
    async getUserID(email: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let sql: string = `SELECT
                                id
                               FROM
                                users
                               WHERE 
                                email = '` + email + `';`

            executeQueryModel.executeQuery(sql)
            .then(function(data) {
                if(typeof data.rows[0] === "undefined") {
                    reject("Not Found");
                }
                else {
                    resolve(data.rows[0].id);
                }
            })
            .catch(function(err) {
                console.log(err)
                reject(err.message);
            })  
        })
    }
}

export const usersAuthFunction: UsersAuthFunction = new UsersAuthFunction();