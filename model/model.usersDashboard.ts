import { executeQueryModel } from "./model.executeQuery";

export class UserDashboardModel {
    async getDashboard(req: any, res: any, id: string): Promise<void> {              
        let sql =  `SELECT
                     *
                    FROM
                     loan_list
                    WHERE 
                     id = '` + id + `';`
        
        await executeQueryModel.executeQuery(sql)
        .then(function(data) {
            res.status(200).json({
                "status": 200,
                "message": "SUCCESS",
                "data": data.rows
            })
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).json({
                "status": 500,
                "message": "Internal Server error"
            })
        })
                    
    }
}

export const userDashboardModel = new UserDashboardModel();