import express from 'express';
import { usersDashboardController } from "../controller/controller.usersDashboard";

const router: any = express.Router();

//USER DASHBOARD AND CREATE LOAN
export class UsersDashboardRoutes {
    init() {
        router.post('/user/createloan', usersDashboardController.createLoan)
        router.post('/user/loandetail', usersDashboardController.loanDetail)
        router.post('/user/dashboard', usersDashboardController.getDashboard)

        return router;
    }
}

export const usersDashboardRoute: UsersDashboardRoutes = new UsersDashboardRoutes();