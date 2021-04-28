import { userAuthModel } from "../model/model.usersAuth"; 

const CryptoJS = require("crypto-js");

export class UserAuthServices {

    async login(req: any, res: any): Promise<void> {
        const email = req.body.email;
        const password = req.body.password;

        const passwordRef = await userAuthModel.passwordCheck(email);

        //DECRYPT PASSWORD BY ITS SALT
        let bytes  = CryptoJS.AES.decrypt(passwordRef, '23(fd*3&!');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);

        //COMPARE PASSWORD
        if(originalText !== password || passwordRef === "Not Found") {
            res.status(400).json({
                "status": "FAILED",
                "message": "INVALID_EMAIL/PASSWORD"
            });
        }
        else {
            userAuthModel.login(res, email);
        }
    }

    async register(req: any, res: any) {

        let email = req.body.email;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
        
        //PASSWORD STRENGTH CONSTRAINT
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasNonalphas = /\W/.test(password);

        //EMAIL VALIDATION CHECK
        if(email.split('@').length !== 2 && email.split('@')[1].split('.').length !== 2) {
            res.status(400).json({
                "status": "FAILED",
                "message": "EMAIL_IS_NOT_VALID"
            });
        }
        
        //PASSWORD STRENGTH CHECK
        else if(password.length < 8 || 
            !hasLowerCase ||
            !hasUpperCase ||
            !hasNumbers ||
            !hasNonalphas) {
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
            userAuthModel.register(req, res)
        }
    }

    async logout(req: any, res: any) {
        userAuthModel.logout(req, res);
    } 
}

export const userAuthServices = new UserAuthServices();