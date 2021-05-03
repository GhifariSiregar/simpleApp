import express from 'express';
import { usersDashboardController } from "../controller/controller.usersDashboard";
import { usersDashboardServices } from "../services/services.usersDashboard";

const router = express.Router();

//USER DASHBOARD AND CREATE LOAN
export class UsersDashboardRoutes {
    init() {
        router.post('/user/createloan', usersDashboardController.createLoan, usersDashboardServices.createLoan)
        router.post('/user/loandetail', usersDashboardController.loanDetail, usersDashboardServices.loanDetail)
        router.post('/user/dashboard', usersDashboardController.getDashboard, usersDashboardServices.getDashboard)

        return router;
    }
}

export const usersDashboardRoute = new UsersDashboardRoutes();