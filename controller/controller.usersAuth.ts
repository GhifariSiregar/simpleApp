import { userAuthServices } from "../services/services.usersAuth";

export class UserAuthController {

    //LOGIN BY EMAIL & PASSWORD (SESSION CREATED IN DATABASE)
    login(req: any, res: any) {
        var email: string = req.body.email;
        var password: string = req.body.password;

        if(email && password) {
            userAuthServices.login(req, res)
        }
        else {
            res.status(400).json({
                "status": "FAILED",
                "message": "FAILED"
            });
        }
    }

    //LOGOUT (STOP SESSION IN DATABASE)
    logout(req: any, res: any) {
        userAuthServices.logout(req, res);
    }

    //NEW USER REGISTRATION
    register(req: any, res: any) {
        let email = req.body.email;
        let name = req.body.name;
        let address = req.body.address;
        let occupancy = req.body.occupancy;
        let ktp = req.body.ktp;
        let gender = req.body.gender;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;

        if(!email || 
            !name || 
            !address || 
            !occupancy || 
            !ktp ||
            !gender ||
            !password ||
            !confirmPassword) {
                res.status(400).json({
                    "status": "FAILED",
                    "message": "PLEASE_FILL_ALL_THE_DATA_FIRST!"
                });
        }
        else {
            userAuthServices.register(req, res)
        }
    }
}

export const userAuthController = new UserAuthController();