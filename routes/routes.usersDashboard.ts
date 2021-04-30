import express from 'express';
import { userLoanController } from "../controller/controller.usersLoan";
import { userLoanDetailController } from "../controller/controller.usersLoanDetail";
import { usersDashboardController } from "../controller/controller.usersDashboard";

const router = express.Router();

//USER DASHBOARD AND CREATE LOAN
export class UsersDashboardRoutes {
    init() {
        router.post('/user/createloan', (req, res) => {
            userLoanController.createLoan(req, res);
        })

        router.post('/user/loandetail', (req, res) => {
            userLoanDetailController.loanDetail(req, res);
        })

        router.post('/user/dashboard', (req, res) => {
            usersDashboardController.getDashboard(req, res);
        })

        return router;
    }
}

export const usersDashboardRoute = new UsersDashboardRoutes();