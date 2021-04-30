import { usersDashboardServices } from "../services/services.usersDashboard";

const jwt = require('jsonwebtoken');

export class UserDashboardController {
    getDashboard(req: any, res: any) {

        //CHECK FOR USER TOKEN
        jwt.verify(req.body.token, "!#shad321.", async function(err: any, decoded: any) {
            if(err) {
                console.log(err.message)
                res.status(400).json({
                    "status": "FAILED",
                    "message": "TOKEN_EXPIRED"
                })
            }

            //GET USER LISTED LOAN BY TOKEN
            else if(!decoded.id) {
                res.status(404).json({
                    "status": "FAILED",
                    "message": "NOT_FOUND"
                })
            }
            else {
                usersDashboardServices.getDashboard(req, res);
            }
        });       
    }
}

export const usersDashboardController = new UserDashboardController();