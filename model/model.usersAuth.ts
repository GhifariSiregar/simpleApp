import { executeQueryModel } from "./model.executeQuery";

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

    async register(req: any,
                    res: any,
                    email: string,
                    name: string,
                    address: string,
                    occupancy: string,
                    ktp: number,
                    gender: string,
                    password: string): Promise<void> {

            let sql = `INSERT INTO
                        users (email, name, address, occupancy, ktp, gender, logged_in, password)
                       VALUES 
                        ('` + email + `', '` + name + `', '` + address + `', '` + occupancy + `', '` + ktp + `', '` + gender + `', True, '` + password + `');`
            
            executeQueryModel.executeQuery(sql)
            .then(function() {
                res.status(200).json({
                    "status": "200",
                    "message": "New User Created"
                });
            })
            .catch(function(err) {
                console.log(err)
                res.status(500).json({
                    "status": "500",
                    "message": "Internal Server Error"
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

    async login(req: any, res: any, email: string): Promise<void> {
        let sql = `UPDATE
                    users
                   SET
                    logged_in = True
                   WHERE
                    email = '` + email + `';`

        executeQueryModel.executeQuery(sql)
        .then(function() {
            res.status(200).json({
                "status": "200",
                "message": "User Has Logged In"
            });
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json({
                "status": "500",
                "message": "Internal Server Error"
            });
        })             
    }

    async logout(req: any, res: any, id: string): Promise<void> {
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
                "status": "500",
                "message": "Internal Server Error"
            });
        })             
    }
}

export const userAuthModel = new UserAuthModel();