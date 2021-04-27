import { userLoanServices } from "../services/services.usersLoan";

export class UserLoanController {
    createLoan(req: any, res: any) {
        let id: string = req.body.id;
        let tenur: number = req.body.tenur;
        let totalpinjam: number = req.body.totalpinjam;

        if(id && tenur && totalpinjam) {
            userLoanServices.createLoan(req, res, id, tenur, totalpinjam)
        }
        else {
            res.status(403).json({
                "status": 403,
                "message": "The inputted data is not correct"
            })
        }
    }
}

export const userLoanController = new UserLoanController();