import express from 'express';
import { userAuthController } from "../controller/controller.usersAuth";

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

export const usersAuthRoute = new UsersAuthRoutes();