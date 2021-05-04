import express from 'express';
import { userAuthController } from "../controller/controller.usersAuth";
import { checkUsersValidity } from "../function/function.checkUserValidity";

const usedMiddleware: any = [checkUsersValidity.checkToken];
const router: any = express.Router();

//USER LOGIN, LOGOUT, REGISTER
export class UsersAuthRoutes {
    init() {
        router.post('/login', userAuthController.login);
        router.post('/logout', usedMiddleware, userAuthController.logout);
        router.post('/register', userAuthController.register);

        return router;
    }
}

export const usersAuthRoute: UsersAuthRoutes = new UsersAuthRoutes();