import express from 'express';
import { userAuthController } from "../controller/controller.usersAuth";

const router: any = express.Router();

//USER LOGIN, LOGOUT, REGISTER
export class UsersAuthRoutes {
    init() {
        router.post('/login', userAuthController.login);
        router.post('/logout', userAuthController.logout);
        router.post('/register', userAuthController.register);

        return router;
    }
}

export const usersAuthRoute: UsersAuthRoutes = new UsersAuthRoutes();