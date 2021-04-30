import { userLoanServices } from "../services/services.usersLoan";

export class UserLoanController {
    createLoan(req: any, res: any) {
        let token: string = req.body.token;
        let tenur: number = req.body.tenur;
        let totalpinjam: number = req.body.totalpinjam;

        if(token && tenur && totalpinjam) {
            userLoanServices.createLoan(req, res)
        }
        else {
            res.status(400).json({
                "status": "FAILED",
                "message": "THE_INPUTTED_DATA_IS_NOT_CORRECT"
            })
        }
    }
}

export const userLoanController = new UserLoanController();