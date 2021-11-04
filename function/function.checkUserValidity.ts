import { tokenManagement } from "../middleware/middleware.jwt";
import { redisManagement } from "../middleware/middleware.redis";

export class CheckUsersValidity {
    async checkToken(req: any, res: any, next: any) {
        try {
            //CHECK FOR USER TOKEN
            const token = req.headers.authorization.split(" ")[1];
            const userToken: any = await tokenManagement.verifyToken(token);
            const email: string = await redisManagement.getData(userToken.email);

            //GET CHECK TOKEN VALIDITY
            if(!userToken.id || token !== email) {
                res.status(401).json({
                    "status": "FAILED",
                    "message": "NOT_AUTHORIZED"
                })
            }
            else {
                next();
            }
        }
        catch(err: any) {
            console.log(err.message)
            res.status(400).json({
                "status": "FAILED",
                "message": "TOKEN_EXPIRED"
            })
        }
    }
} 

export const checkUsersValidity: CheckUsersValidity = new CheckUsersValidity();