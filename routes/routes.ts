import express from 'express';
import { userAuthController } from "../controller/controller.usersAuth";
import { usersDashboardController } from "../controller/controller.usersDashboard";
import { checkUsersValidity } from "../function/function.checkUserValidity";

const usedMiddleware: any = [checkUsersValidity.checkToken];
const router: any = express.Router();

//USER LOGIN, LOGOUT, REGISTER
router.post('/login', userAuthController.login);
router.post('/logout', usedMiddleware, userAuthController.logout);
router.post('/register', userAuthController.register);

//USER DASHBOARD AND CREATE LOAN
router.post('/user/createloan', usedMiddleware, usersDashboardController.createLoan)
router.post('/user/loandetail', usedMiddleware, usersDashboardController.loanDetail)
router.post('/user/dashboard', usedMiddleware, usersDashboardController.getDashboard)

//CHAT APP

export const route = router;