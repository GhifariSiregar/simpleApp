import { userLoanModel } from "../model/model.usersLoan";
import { userAuthModel } from "../model/model.usersAuth";

export class UserLoanServices {
    async createLoan(req: any, res: any): Promise<void> {

        let id: string = req.body.id;
        let tenur: number = req.body.tenur;
        let totalpinjam: number = req.body.totalpinjam;
        
        //CHECK ARE USER IS IN SESSION OR NOT
        let status = await userAuthModel.checkstatus(id);

        if(status !== true) {
            res.status(401).json({
                "status": "FAILED",
                "message": "UNAUTHORIZED_USER"
            })
        }

        //LOAN CRITERIA, MUST BE BETWEEN RP1.000.000 UNTIL RP10.000.000 AND 1 UNTIL 12 LOAN LENGTH
        else if(totalpinjam < 1000000 || totalpinjam > 10000000 || tenur < 1 || tenur > 12) {
            res.status(400).json({
                "status": "FAILED",
                "message": "VALUE_IS_OUT_OF_BOUND"
            })
        }
        else {
            userLoanModel.createLoan(req, res);
        }
    }
}

export const userLoanServices = new UserLoanServices();