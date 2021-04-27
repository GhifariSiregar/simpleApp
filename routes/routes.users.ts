import express from 'express';
import { userAuthController } from "../controller/controller.usersAuth";
import { userLoanController } from "../controller/controller.usersLoan";
import { usersDashboardController } from "../controller/controller.usersDashboard";

const router = express.Router();

//USER LOGIN, LOGOUT, REGISTER
export class UsersAuthRoutes {
    init() {
        router.post('/login', (req, res) => {
            userAuthController.login(req, res);
        })

        router.post('/logout', (req, res) => {
            userAuthController.logout(req, res);
        })

        router.post('/register', (req, res) => {
            userAuthController.register(req, res);
        })

        return router;
    }
}

//USER DASHBOARD AND CREATE LOAN
export class UsersDashboardRoutes {
    init() {
        router.get('/user/createloan', (req, res) => {
            res.status(200).json({
                "status": 200,
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

export const usersAuthRoute = new UsersAuthRoutes();
export const usersDashboardRoute = new UsersDashboardRoutes();