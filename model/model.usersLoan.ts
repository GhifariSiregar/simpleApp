import { executeQueryModel } from "../middleware/middleware.pg";
import { tokenManagement } from "../middleware/middleware.jwt";

export class UserLoanModel {
    async createLoan(req: any, res: any): Promise<void> {

        //GET USER TOKEN
        const userToken: any = await tokenManagement.verifyToken(req.headers.authorization.split(" ")[1]);

        //EDIT LOAN DETAIL
        if(req.query.id) {
            let uid: string = userToken.id;
            let loanLength: number = req.body.loanLength;
            let loanAmount: number = req.body.loanAmount;
                            
            let sql: string = `UPDATE
                                loan_list
                               SET 
                                loan_length = ` + loanLength + `,
                                loan_amount = ` + loanAmount + `
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

        //CREATE NEW LOAN
        else {
            let uid: string = userToken.id;
            let loanLength: number = req.body.loanLength;
            let loanAmount: number = req.body.loanAmount;
                            
            let sql: string =  `INSERT INTO
                                    loan_list (id, loan_length, loan_amount, status)
                                VALUES 
                                    ('` + uid + `', ` + loanLength + `, ` + loanAmount + `, 'Menunggu Pencairan');`
            
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
    }
}

export const userLoanModel: UserLoanModel = new UserLoanModel();