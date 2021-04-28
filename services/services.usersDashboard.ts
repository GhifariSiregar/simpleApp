import { userDashboardModel } from "../model/model.usersDashboard";

export class UserDashboardServices {
    getDashboard(req: any, res: any) {
        userDashboardModel.getDashboard(req, res)
    }
}

export const usersDashboardServices = new UserDashboardServices();