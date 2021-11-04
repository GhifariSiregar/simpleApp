import { userDashboardModel } from "../model/model.usersDashboard";
import { userLoanModel } from "../model/model.usersLoan";
import { userLoanDetailModel } from "../model/model.usersLoanDetail";
import { tokenManagement } from "../middleware/middleware.jwt";

export class UserDashboardServices {
    async getDashboard(req: any, res: any) {
        try {
            //GET USER TOKEN
            const userToken: any = await tokenManagement.verifyToken(req.headers.authorization.split(" ")[1]);
            userDashboardModel.getDashboard(req, res, userToken.id);

        }
        catch(err: any) {
            console.log(err.message)
            res.status(400).json({
                "status": "FAILED",
                "message": "TOKEN_EXPIRED"
            })
        }
    }

    async createLoan(req: any, res: any): Promise<void> {
        let loanLength: number = req.body.loanLength;
        let loanAmount: number = req.body.loanAmount;

        //LOAN CRITERIA, MUST BE BETWEEN RP1.000.000 UNTIL RP10.000.000 AND 1 UNTIL 12 LOAN LENGTH
        if(loanAmount < 1000000 || loanAmount > 10000000 || loanLength < 1 || loanLength > 12) {
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

export const usersDashboardServices: UserDashboardServices = new UserDashboardServices();