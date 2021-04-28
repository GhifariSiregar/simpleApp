import { executeQueryModel } from "./model.executeQuery";

const CryptoJS = require("crypto-js");

export class UserAuthModel {
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

    async register(req: any, res: any): Promise<void> {

            let email = req.body.email;
            let name = req.body.name;
            let address = req.body.address;
            let occupancy = req.body.occupancy;
            let ktp = req.body.ktp;
            let gender = req.body.gender;
            let confirmPassword = req.body.confirmPassword;

            //PASSWORD HASHING
            let password = CryptoJS.AES.encrypt(confirmPassword, '23(fd*3&!').toString();

            let sql = `INSERT INTO
                        users (email, name, address, occupancy, ktp, gender, logged_in, password)
                       VALUES 
                        ('` + email + `', '` + name + `', '` + address + `', '` + occupancy + `', '` + ktp + `', '` + gender + `', True, '` + password + `');`
            
            executeQueryModel.executeQuery(sql)
            .then(function() {
                res.status(200).json({
                    "status": "SUCCESS",
                    "message": "NEW_USER_CREATED"
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

    async login(res: any, email: string): Promise<void> {
        let sql = `UPDATE
                    users
                   SET
                    logged_in = True
                   WHERE
                    email = '` + email + `';`

        executeQueryModel.executeQuery(sql)
        .then(function() {
            res.status(200).json({
                "status": "SUCCESS",
                "message": "USER_HAS_LOGGED_IN"
            });
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json({
                "status": "NOK",
                "message": "INTERNAL_SERVER_ERROR"
            });
        })             
    }

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
            res.status(200).redirect("/login");
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