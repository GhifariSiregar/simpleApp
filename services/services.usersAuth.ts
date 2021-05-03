import { userAuthModel } from "../model/model.usersAuth"; 
import { passwordManagement } from "../middleware/middleware.cryptoJS";

export class UserAuthServices {

    async login(req: any, res: any): Promise<void> {
        const email: string = req.body.email;
        const password: string = req.body.password;

        try {
            const passwordRef: string = await userAuthModel.passwordCheck(email);
            const userPassword: string = await passwordManagement.decrypt(passwordRef);

            //COMPARE PASSWORD
            if(userPassword !== password || passwordRef === "Not Found") {
                res.status(400).json({
                    "status": "FAILED",
                    "message": "INVALID_EMAIL/PASSWORD"
                });
            }
            else {
                userAuthModel.login(req, res);
            }
        }
        catch(err) {
            res.status(500).json({
                "status": "NOK",
                "message": "INTERNAL_SERVER_ERROR"
            });
        }
    }

    async register(req: any, res: any) {

        let email: string = req.body.email;
        let password: string = req.body.password;
        let confirmPassword: string = req.body.confirmPassword;

        //EMAIL VALIDATION CHECK
        if(email.split('@').length !== 2 && email.split('@')[1].split('.').length !== 2) {
            res.status(400).json({
                "status": "FAILED",
                "message": "EMAIL_IS_NOT_VALID"
            });
        }
        
        //PASSWORD STRENGTH CHECK
        else if(passwordManagement.isWeak(password)) {
                res.status(400).json({
                    "status": "FAILED",
                    "message": "PASSWORD_IS_NOT_STRONG_ENOUGH"
                });
        }

        //PASSWORD CONFIRMATION CHECK
        else if(password !== confirmPassword) {
            res.status(400).json({
                "status": "FAILED",
                "message": "PASSWORD_IS_NOT_MATCHED"
            });
        }
        else {
            userAuthModel.register(req, res);
        }
    }

    async logout(req: any, res: any) {
        userAuthModel.logout(req, res);
    } 
}

export const userAuthServices: UserAuthServices = new UserAuthServices();