import express from 'express';
import { usersDashboardController } from "../controller/controller.usersDashboard";
import { checkUsersValidity } from "../function/function.checkUserValidity";

const usedMiddleware: any = [checkUsersValidity.checkToken];
const router: any = express.Router();

//USER DASHBOARD AND CREATE LOAN
export class UsersDashboardRoutes {
    init() {
        router.post('/user/createloan', usedMiddleware, usersDashboardController.createLoan)
        router.post('/user/loandetail', usedMiddleware, usersDashboardController.loanDetail)
        router.post('/user/dashboard', usedMiddleware, usersDashboardController.getDashboard)

        return router;
    }
}

export const usersDashboardRoute: UsersDashboardRoutes = new UsersDashboardRoutes();