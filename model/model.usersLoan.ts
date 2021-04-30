import { executeQueryModel } from "./model.executeQuery";

const jwt = require('jsonwebtoken');

export class UserLoanModel {
    async createLoan(req: any, res: any): Promise<void> {

        //CHECK FOR USER TOKEN
        jwt.verify(req.body.token, "!#shad321.", async function(err: any, decoded: any) {
            if(err) {
                console.log(err.message)
                res.status(500).json({
                    "status": "FAILED",
                    "message": "INTERNAL_SERVER_ERROR"
                })
            }

            //GET USER LISTED LOAN BY TOKEN
            else if(!decoded.id) {
                res.status(404).json({
                    "status": "FAILED",
                    "message": "NOT_FOUND"
                })
            }
            else if(req.query.id) {
                let uid: string = decoded.id;
                let tenur: number = req.body.tenur;
                let totalpinjam: number = req.body.totalpinjam;
                                
                let sql = `UPDATE
                            loan_list
                           SET 
                            loan_length = ` + tenur + `,
                            loan_amount = ` + totalpinjam + `
                           WHERE
                            invoice = '` + req.query.id + `'
                           AND
                            id = '` + uid + `';`
                
                await executeQueryModel.executeQuery(sql)
                .then(function(data) {
                    res.status(200).json({
                        "status": "SUCCESS",
                        "message": "SUCCESS"
                    })
                })
                .catch(function(err) {
                    console.log(err)
                    res.status(500).json({
                        "status": "NOK",
                        "message": "INTERNAL_SERVER_ERROR"
                    })
                })
            }
            else {
                let uid: string = decoded.id;
                let tenur: number = req.body.tenur;
                let totalpinjam: number = req.body.totalpinjam;
                                
                let sql =  `INSERT INTO
                            loan_list (id, loan_length, loan_amount, status)
                            VALUES 
                            ('` + uid + `', ` + tenur + `, ` + totalpinjam + `, 'Menunggu Pencairan');`
                
                await executeQueryModel.executeQuery(sql)
                .then(function(data) {
                    res.status(200).json({
                        "status": "SUCCESS",
                        "message": "SUCCESS"
                    })
                })
                .catch(function(err) {
                    console.log(err)
                    res.status(500).json({
                        "status": "NOK",
                        "message": "INTERNAL_SERVER_ERROR"
                    })
                })
            }
        });         
    }
}

export const userLoanModel = new UserLoanModel();