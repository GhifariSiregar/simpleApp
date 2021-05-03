import { userDashboardModel } from "../model/model.usersDashboard";
import { userLoanModel } from "../model/model.usersLoan";
import { userLoanDetailModel } from "../model/model.usersLoanDetail";
import { redisManagement } from "../middleware/middleware.redis";
import { tokenManagement } from "../middleware/middleware.jwt";

export class UserDashboardServices {
    async getDashboard(req: any, res: any) {
        try {

            //CHECK FOR USER TOKEN
            const userToken = await tokenManagement.verifyToken(req.body.token);
            const email = await redisManagement.getData(userToken.email);

            //GET USER LISTED LOAN BY TOKEN
            if(!userToken.id) {
                res.status(404).json({
                    "status": "FAILED",
                    "message": "NOT_FOUND"
                })
            }
            else if(req.body.token === email) {
                userDashboardModel.getDashboard(req, res, userToken.id)
            }
            else {
                res.status(404).json({
                    "status": "FAILED",
                    "message": "NOT_FOUND"
                })
            }
        }
        catch(err) {
            console.log(err.message)
            res.status(400).json({
                "status": "FAILED",
                "message": "TOKEN_EXPIRED"
            })
        }
    }

    async createLoan(req: any, res: any): Promise<void> {
        let tenur: number = req.body.tenur;
        let totalpinjam: number = req.body.totalpinjam;

        //LOAN CRITERIA, MUST BE BETWEEN RP1.000.000 UNTIL RP10.000.000 AND 1 UNTIL 12 LOAN LENGTH
        if(totalpinjam < 1000000 || totalpinjam > 10000000 || tenur < 1 || tenur > 12) {
            res.status(400).json({
                "status": "FAILED",
                "message": "VALUE_IS_OUT_OF_BOUND"
            })
        }
        else {
            userLoanModel.createLoan(req, res);
        }
    }

    async loanDetail(req: any, res: any): Promise<void> {
        userLoanDetailModel.loanDetail(req, res);
    }
}

export const usersDashboardServices = new UserDashboardServices();