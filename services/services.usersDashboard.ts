import { userDashboardModel } from "../model/model.usersDashboard";
import { redisManagement } from "../model/model.redis";

const jwt = require('jsonwebtoken');

export class UserDashboardServices {
    getDashboard(req: any, res: any) {

        //CHECK FOR USER TOKEN
        jwt.verify(req.body.token, "!#shad321.", async function(err: any, decoded: any): Promise<void> {
            const email = await redisManagement.getData(decoded.email);

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
            else if(req.body.token === email) {
                userDashboardModel.getDashboard(decoded.id, res)
            }
            else {
                res.status(404).json({
                    "status": "FAILED",
                    "message": "NOT_FOUND"
                })
            }
        });
    }
}

export const usersDashboardServices = new UserDashboardServices();