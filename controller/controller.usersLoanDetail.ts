import { userLoanDetailServices } from "../services/services.usersLoanDetail";

export class UserLoanDetailController {
    loanDetail(req: any, res: any) {
        if(req.query.id) {
            userLoanDetailServices.loanDetail(req, res)
        }
        else {
            res.status(400).json({
                "status": "FAILED",
                "message": "THE_INPUTTED_DATA_IS_NOT_CORRECT"
            })
        }
    }
}

export const userLoanDetailController = new UserLoanDetailController();