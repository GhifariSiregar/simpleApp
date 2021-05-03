import express from 'express';
import { userAuthController } from "../controller/controller.usersAuth";
import { userAuthServices } from "../services/services.usersAuth";
import { userAuthModel } from "../model/model.usersAuth"; 

const router = express.Router();

//USER LOGIN, LOGOUT, REGISTER
export class UsersAuthRoutes {
    init() {
        router.post('/login', userAuthController.login, userAuthServices.login, userAuthModel.login);
        router.post('/logout', userAuthController.logout, userAuthServices.logout, userAuthModel.logout);
        router.post('/register', userAuthController.register, userAuthServices.register, userAuthModel.register);

        return router;
    }
}

export const usersAuthRoute = new UsersAuthRoutes();