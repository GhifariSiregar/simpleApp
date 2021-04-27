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
                "status": "400",
                "message": "FAILED"
            });
        }
    }

    //LOGOUT (STOP SESSION IN DATABASE)
    logout(req: any, res: any) {
        let id = req.query.id;
        userAuthServices.logout(req, res, id);
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
        let confirmPassword = req.body.confirmPassword

        if(!email || 
            !name || 
            !address || 
            !occupancy || 
            !ktp ||
            !gender) {
                res.status(403).json({
                    "status": "403",
                    "message": "Please fill all the data first !"
                });
        }
        else {
            userAuthServices.register(req, 
                                      res, 
                                      email, 
                                      name, 
                                      address, 
                                      occupancy, 
                                      ktp, 
                                      gender,
                                      password, 
                                      confirmPassword)
        }
    }
}

export const userAuthController = new UserAuthController();