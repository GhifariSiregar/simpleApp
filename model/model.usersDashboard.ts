import { executeQueryModel } from "../middleware/middleware.pg";

export class UserDashboardModel {
    async getDashboard(req: any, res: any, id: string): Promise<void> {
        
        let offset: number = 0;
        if(req.body.no) {
            offset = (parseInt(req.body.no) - 1) * 5;
        }

        let sql: string =  `SELECT
                             *
                            FROM
                             loan_list
                            WHERE 
                             id = '` + id + `'
                            OFFSET
                             ` + offset + `;`; 
        
        await executeQueryModel.executeQuery(sql)
        .then(function(data) {
            let dasend: any = [];
            for(let i = 0; i < offset + 5; i++) {
                if(data.rows[i]) {
                    dasend.push(data.rows[i]);
                }
                else {
                    break;
                }
            }
            res.status(200).json({
                "status": "SUCCESS",
                "message": "SUCCESS",
                "data": dasend,
                "pagination": Math.ceil((data.rows.length + offset) / 5)
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

export const userDashboardModel: UserDashboardModel = new UserDashboardModel();