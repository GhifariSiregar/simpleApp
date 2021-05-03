import { userAuthModel } from "../model/model.usersAuth"; 
import { passwordManagement } from "../middleware/middleware.cryptoJS";

export class UserAuthServices {

    async login(req: any, res: any, next: any): Promise<void> {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const passwordRef = await userAuthModel.passwordCheck(email);
            const userPassword = await passwordManagement.decrypt(passwordRef);

            //COMPARE PASSWORD
            if(userPassword !== password || passwordRef === "Not Found") {
                res.status(400).json({
                    "status": "FAILED",
                    "message": "INVALID_EMAIL/PASSWORD"
                });
            }
            else {
                next();
            }
        }
        catch(err) {
            res.status(500).json({
                "status": "NOK",
                "message": "INTERNAL_SERVER_ERROR"
            });
        }
    }

    async register(req: any, res: any, next: any) {

        let email = req.body.email;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;

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
            next();
        }
    }

    async logout(req: any, res: any, next: any) {
        next();
    } 
}

export const userAuthServices = new UserAuthServices();