import express from 'express';
import { userLoanController } from "../controller/controller.usersLoan";
import { usersDashboardController } from "../controller/controller.usersDashboard";

const router = express.Router();

//USER DASHBOARD AND CREATE LOAN
export class UsersDashboardRoutes {
    init() {
        router.get('/user/createloan', (req, res) => {
            res.status(200).json({
                "status": "SUCCESS",
                "message": "SUCCESS"
            })
        })

        router.post('/user/createloan', (req, res) => {
            userLoanController.createLoan(req, res);
        })

        router.get('/user/dashboard', (req, res) => {
            usersDashboardController.getDashboard(req, res);
        })

        return router;
    }
}

export const usersDashboardRoute = new UsersDashboardRoutes();