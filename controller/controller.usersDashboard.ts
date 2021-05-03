import { tokenManagement } from "../middleware/middleware.jwt";
import { usersDashboardServices } from "../services/services.usersDashboard";

export class UserDashboardController {
    async getDashboard(req: any, res: any, next: any) {
        try {
            //CHECK FOR USER TOKEN
            const userToken = await tokenManagement.verifyToken(req.body.token);

            //GET USER LISTED LOAN BY TOKEN
            if(!userToken.id) {
                res.status(404).json({
                    "status": "FAILED",
                    "message": "NOT_FOUND"
                })
            }
            else {
                next();
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

    createLoan(req: any, res: any, next: any) {
        let token: string = req.body.token;
        let loanLength: number = req.body.loanLength;
        let loanAmount: number = req.body.loanAmount;

        if(token && loanLength && loanAmount) {
            next();
        }
        else {
            res.status(400).json({
                "status": "FAILED",
                "message": "THE_INPUTTED_DATA_IS_NOT_CORRECT"
            })
        }
    }

    loanDetail(req: any, res: any, next: any) {
        if(req.query.id) {
            next();
        }
        else {
            res.status(400).json({
                "status": "FAILED",
                "message": "THE_INPUTTED_DATA_IS_NOT_CORRECT"
            })
        }
    }
}

export const usersDashboardController = new UserDashboardController();