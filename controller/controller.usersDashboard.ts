import { usersDashboardServices } from "../services/services.usersDashboard";

export class UserDashboardController {
    getDashboard(req: any, res: any) {

        //GET USER LISTED LOAN BY QUERYSTRING
        if(typeof req.query.id === "undefined") {
            res.status(404).json({
                "status": "FAILED",
                "message": "NOT_FOUND"
            })
        }
        else {
            usersDashboardServices.getDashboard(req, res);
        }
    }
}

export const usersDashboardController = new UserDashboardController();