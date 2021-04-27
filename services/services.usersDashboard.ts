import { userDashboardModel } from "../model/model.usersDashboard";

export class UserDashboardServices {
    getDashboard(req: any, res: any) {
        userDashboardModel.getDashboard(req, res, req.query.id)
    }
}

export const usersDashboardServices = new UserDashboardServices();