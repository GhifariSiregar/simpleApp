import { executeQueryModel } from "../middleware/middleware.pg";
import { redisManagement } from "../middleware/middleware.redis";
import { tokenManagement } from "../middleware/middleware.jwt";

export class UserLoanDetailModel {
    async loanDetail(req: any, res: any): Promise<void> {
        try {

            //CHECK FOR USER TOKEN
            const userToken: any = await tokenManagement.verifyToken(req.headers.authorization.split(" ")[1]);
            const email: string = await redisManagement.getData(userToken.email);

            //TOKEN VERIFICATION
            if(!userToken.id || req.headers.authorization.split(" ")[1] !== email) {
                res.status(404).json({
                    "status": "FAILED",
                    "message": "NOT_FOUND"
                })
            }

            //GET LOAN LIST
            else {
                let sql: string =  `SELECT
                                     *
                                    FROM
                                     loan_list
                                    WHERE 
                                     id = '` + userToken.id + `'
                                    AND
                                     invoice = ` + req.query.id + `;`
        
                await executeQueryModel.executeQuery(sql)
                .then(function(data) {
                    res.status(200).json({
                        "status": "SUCCESS",
                        "message": "SUCCESS",
                        "data": data.rows[0]
                    })
                })
            }     
        }
        catch(err) {
            console.log(err)
            res.status(500).json({
                "status": "NOK",
                "message": "INTERNAL_SERVER_ERROR"
            })
        }   
    }
}

export const userLoanDetailModel: UserLoanDetailModel = new UserLoanDetailModel();