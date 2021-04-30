import { userDashboardModel } from "../model/model.usersDashboard";

export class UserDashboardServices {
    getDashboard(id: string, res: any) {
        userDashboardModel.getDashboard(id, res)
    }
}

export const usersDashboardServices = new UserDashboardServices();