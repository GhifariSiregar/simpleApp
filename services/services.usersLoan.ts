import { userLoanModel } from "../model/model.usersLoan";
import { userAuthModel } from "../model/model.usersAuth";

export class UserLoanServices {
    async createLoan(req: any, res: any, id: string, tenur: number, totalpinjam: number): Promise<void> {
        
        //CHECK ARE USER IS IN SESSION OR NOT
        let status = await userAuthModel.checkstatus(id);

        if(status !== true) {
            res.status(401).json({
                "status": 401,
                "message": "Unauthorized user"
            })
        }

        //LOAN CRITERIA, MUST BE BETWEEN RP1.000.000 UNTIL RP10.000.000 AND 1 UNTIL 12 LOAN LENGTH
        else if(totalpinjam < 1000000 || totalpinjam > 10000000 || tenur < 1 || tenur > 12) {
            res.status(403).json({
                "status": 403,
                "message": "Value is out of bound"
            })
        }
        else {
            userLoanModel.createLoan(req, res, id, tenur, totalpinjam);
        }
    }
}

export const userLoanServices = new UserLoanServices();