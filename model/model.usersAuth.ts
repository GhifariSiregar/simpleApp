import { executeQueryModel } from "../middleware/middleware.pg";
import { redisManagement } from "../middleware/middleware.redis";
import { usersAuthFunction } from "../function/function.usersAuth";
import { tokenManagement } from "../middleware/middleware.jwt";
import { passwordManagement } from "../middleware/middleware.cryptoJS";

export class UserAuthModel {

    //USER LOGIN STATUS IN DATABASE
    async checkstatus(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let sql: string = `SELECT
                                logged_in
                               FROM
                                users
                               WHERE 
                                id = '` + id + `';`
            
            executeQueryModel.executeQuery(sql)
            .then(function(data) {
                resolve(data.rows[0].logged_in);
            })
            .catch(function(err) {
                console.log(err)
                resolve("error");
            }) 
        })            
    }

    //USER REGISTRATION
    async register(req: any, res: any): Promise<void> {

        let email: string = req.body.email;
        let name: string = req.body.name;
        let address: string = req.body.address;
        let occupancy: string = req.body.occupancy;
        let ktp: number = req.body.ktp;
        let gender: string = req.body.gender;
        let confirmPassword: string = req.body.confirmPassword;

        //PASSWORD HASHING
        let password: any = passwordManagement.encrypt(confirmPassword);
        
        //CREATE USER
        let sql: string = `INSERT INTO
                            users (email, name, address, occupancy, ktp, gender, logged_in, password)
                           VALUES 
                            ('` + email + `', '` + name + `', '` + address + `', '` + occupancy + `', '` + ktp + `', '` + gender + `', True, '` + password + `');`
        
        try {
            executeQueryModel.executeQuery(sql)
            .then(async function() {

                //LOG THE USER IN
                const userID: string = await usersAuthFunction.getUserID(email);
                const userToken: string = await tokenManagement.signToken(userID, email);

                //CACHE THE TOKEN
                redisManagement.setData(email, 3600, userToken);
                res.status(200).json({
                    "status": "SUCCESS",
                    "message": "NEW_USER_CREATED",
                    "token": userToken
                });
            }) 
        }
        catch(err) {
            console.log(err)
            res.status(500).json({
                "status": "NOK",
                "message": "INTERNAL_SERVER_ERROR"
            });
        }          
    }

    //GET USER PASSWORD FROM DATABASE
    async passwordCheck(email: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let sql: string = `SELECT
                                email, password
                               FROM
                                users
                               WHERE 
                                email = '` + email + `';`
            
            executeQueryModel.executeQuery(sql)
            .then(function(data) {
                if(typeof data.rows[0] === "undefined") {
                    resolve("Not Found");
                }
                else {
                    resolve(data.rows[0].password);
                }
            })
            .catch(function(err) {
                console.log(err);
                resolve("error");
            }) 
        })    
    }

    //USER LOGIN
    async login(req: any, res: any): Promise<void> {
        const email: string = req.body.email;
        let sql: string = `UPDATE
                            users
                           SET
                            logged_in = True
                           WHERE
                            email = '` + email + `';`

        executeQueryModel.executeQuery(sql)
        .then(async function() {
            try {

                //LOG THE USER IN
                const userID: string = await usersAuthFunction.getUserID(email);
                const userToken: string = await tokenManagement.signToken(userID, email);

                //CACHE THE TOKEN
                redisManagement.setData(email, 3600, userToken);
                res.status(200).json({
                    "status": "SUCCESS",
                    "message": "USER_HAS_LOGGED_IN",
                    "token": userToken
                });
            }
            catch(err) {
                console.log(err);
                res.status(500).json({
                    "status": "NOK",
                    "message": "INTERNAL_SERVER_ERROR"
                });
            }
        })           
    }

    //USER LOGOUT
    async logout(req: any, res: any): Promise<void> {
        let id: string = req.query.id;
        let sql: string = `UPDATE
                            users
                           SET
                            logged_in = False
                           WHERE
                            id = '` + id + `';`

        executeQueryModel.executeQuery(sql)
        .then(function() {
            res.status(200).json({
                "status": "SUCCESS",
                "message": "USER_HAS_LOGGED_OUT"
            });
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).json({
                "status": "NOK",
                "message": "INTERNAL_SERVER_ERROR"
            });
        })             
    }
}

export const userAuthModel: UserAuthModel = new UserAuthModel();