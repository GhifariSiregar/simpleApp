import { executeQueryModel } from "./model.executeQuery";

const jwt = require('jsonwebtoken');

export class UserLoanDetailModel {
    async loanDetail(req: any, res: any): Promise<void> {

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
            else {
                let sql =  `SELECT
                            *
                           FROM
                            loan_list
                           WHERE 
                            id = '` + decoded.id + `'
                           AND
                            invoice = ` + req.query.id + `;`
        
                await executeQueryModel.executeQuery(sql)
                .then(function(data) {
                    if(typeof data.rows[0] == "undefined") {
                        res.status(404).json({
                            "status": "FAILED",
                            "message": "NOT_FOUND"
                        })
                    }
                    else {
                        res.status(200).json({
                            "status": "SUCCESS",
                            "message": "SUCCESS",
                            "data": data.rows[0]
                        })
                    }
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

export const userLoanDetailModel = new UserLoanDetailModel();