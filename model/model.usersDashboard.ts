import { executeQueryModel } from "./model.executeQuery";

export class UserDashboardModel {
    async getDashboard(id: string, res: any): Promise<void> {              
        let sql =  `SELECT
                     *
                    FROM
                     loan_list
                    WHERE 
                     id = '` + id + `';`
        
        await executeQueryModel.executeQuery(sql)
        .then(function(data) {
            res.status(200).json({
                "status": "SUCCESS",
                "message": "SUCCESS",
                "data": data.rows
            })
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).json({
                "status": "NOK",
                "message": "INTERNAL_SERVER_ERROR"
            })
        })       
    }
}

export const userDashboardModel = new UserDashboardModel();