import { userLoanDetailModel } from "../model/model.usersLoanDetail";

export class UserLoanDetailServices {
    async loanDetail(req: any, res: any): Promise<void> {
        userLoanDetailModel.loanDetail(req, res);
    }
}

export const userLoanDetailServices = new UserLoanDetailServices();