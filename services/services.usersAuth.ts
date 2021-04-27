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
            res.status(403).json({
                "status": "403",
                "message": "Invalid email/password"
            });
        }
        else {
            userAuthModel.login(req, res, email);
        }
    }

    async register(req: any, 
                   res: any,
                   email: string,
                   name: string,
                   address: string,
                   occupancy: string,
                   ktp: number,
                   gender: string,
                   password: string,
                   confirmPassword: string) {

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasNonalphas = /\W/.test(password);

        //PASSWORD STRENGTH CHECK
        if(password.length < 8 || 
            !hasLowerCase ||
            !hasUpperCase ||
            !hasNumbers ||
            !hasNonalphas) {
                res.status(403).json({
                    "status": "403",
                    "message": "Password is not strong"
                });
        }
       
        //EMAIL VALIDATION CHECK
        else if(email.split('@').length !== 2 && email.split('@')[1].split('.').length !== 2) {
            res.status(403).json({
                "status": "403",
                "message": "Email is not valid"
            });
        }

        //PASSWORD CONFIRMATION CHECK
        else if(password !== confirmPassword) {
            res.status(403).json({
                "status": "403",
                "message": "Password is not matched"
            });
        }
        else {

            //PASSWORD HASHING
            let hashPassword = CryptoJS.AES.encrypt(password, '23(fd*3&!').toString();
            userAuthModel.register(req,
                                    res,
                                    email, 
                                    name, 
                                    address, 
                                    occupancy, 
                                    ktp, 
                                    gender, 
                                    hashPassword)
        }
    }

    async logout(req: any, res: any, id: string) {
        userAuthModel.logout(req, res, id);
    } 
}

export const userAuthServices = new UserAuthServices();