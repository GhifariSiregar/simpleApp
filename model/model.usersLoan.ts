import { executeQueryModel } from "./model.executeQuery";

export class UserLoanModel {
    async createLoan(req: any, res: any): Promise<void> {
        
        let uid: string = req.body.id;
        let tenur: number = req.body.tenur;
        let totalpinjam: number = req.body.totalpinjam;
                         
        let sql =  `INSERT INTO
                     loan_list (id, loan_length, loan_amount, status)
                    VALUES 
                     ('` + uid + `', ` + tenur + `, ` + totalpinjam + `, 'Menunggu Pencairan');`
        
        await executeQueryModel.executeQuery(sql)
        .then(function(data) {
            res.status(200).json({
                "status": "SUCCESS",
                "message": "SUCCESS"
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

export const userLoanModel = new UserLoanModel();