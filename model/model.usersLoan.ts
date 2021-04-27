import { executeQueryModel } from "./model.executeQuery";

export class UserLoanModel {
    async createLoan(req: any, 
                     res: any, 
                     uid: string, 
                     tenur: number, 
                     totalpinjam: number): Promise<void> {
                         
        let sql =  `INSERT INTO
                     loan_list (id, loan_length, loan_amount, status)
                    VALUES 
                     ('` + uid + `', ` + tenur + `, ` + totalpinjam + `, 'Menunggu Pencairan');`
        
        await executeQueryModel.executeQuery(sql)
        .then(function(data) {
            res.status(200).json({
                "status": 200,
                "message": "SUCCESS"
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

export const userLoanModel = new UserLoanModel();