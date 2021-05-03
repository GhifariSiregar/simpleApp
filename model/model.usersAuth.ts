import { executeQueryModel } from "../middleware/middleware.pg";
import { redisManagement } from "../middleware/middleware.redis";
import { usersAuthFunction } from "../function/function.usersAuth";
import { tokenManagement } from "../middleware/middleware.jwt";
import { passwordManagement } from "../middleware/middleware.cryptoJS";

export class UserAuthModel {

    //USER LOGIN STATUS IN DATABASE
    async checkstatus(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let sql = `SELECT
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

        let email = req.body.email;
        let name = req.body.name;
        let address = req.body.address;
        let occupancy = req.body.occupancy;
        let ktp = req.body.ktp;
        let gender = req.body.gender;
        let confirmPassword = req.body.confirmPassword;

        //PASSWORD HASHING
        let password = passwordManagement.encrypt(confirmPassword);
        
        //CREATE USER
        let sql = `INSERT INTO
                    users (email, name, address, occupancy, ktp, gender, logged_in, password)
                    VALUES 
                    ('` + email + `', '` + name + `', '` + address + `', '` + occupancy + `', '` + ktp + `', '` + gender + `', True, '` + password + `');`
        
        try {
            executeQueryModel.executeQuery(sql)
            .then(async function() {

                //LOG THE USER IN
                const userID = await usersAuthFunction.getUserID(email);
                const userToken = await tokenManagement.signToken(userID, email);

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
            let sql = `SELECT
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
        const email = req.body.email;
        let sql = `UPDATE
                    users
                   SET
                    logged_in = True
                   WHERE
                    email = '` + email + `';`

        executeQueryModel.executeQuery(sql)
        .then(async function() {
            try {

                //LOG THE USER IN
                const userID = await usersAuthFunction.getUserID(email);
                const userToken = await tokenManagement.signToken(userID, email);

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
        let id = req.query.id;
        let sql = `UPDATE
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

export const userAuthModel = new UserAuthModel();