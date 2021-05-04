import { usersDashboardServices } from "../services/services.usersDashboard";

export class UserDashboardController {
    async getDashboard(req: any, res: any, next: any) {
        usersDashboardServices.getDashboard(req, res);
    }

    createLoan(req: any, res: any) {
        let loanLength: number = req.body.loanLength;
        let loanAmount: number = req.body.loanAmount;

        if(loanLength && loanAmount) {
            usersDashboardServices.createLoan(req, res);
        }
        else {
            res.status(400).json({
                "status": "FAILED",
                "message": "THE_INPUTTED_DATA_IS_NOT_CORRECT"
            })
        }
    }

    loanDetail(req: any, res: any) {
        if(req.query.id) {
            usersDashboardServices.loanDetail(req, res);
        }
        else {
            res.status(400).json({
                "status": "FAILED",
                "message": "THE_INPUTTED_DATA_IS_NOT_CORRECT"
            })
        }
    }
}

export const usersDashboardController: UserDashboardController = new UserDashboardController();