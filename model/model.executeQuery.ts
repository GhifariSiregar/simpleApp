const { Client } = require('pg');
const db = new Client({
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "abcdefgh1234!",
    "database": "pinjammodal_simpleapp"
})

db.connect();

export class ExecuteQueryModel {
    async executeQuery(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            db.query(sql, (err: any, result: any) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    }
}

export const executeQueryModel = new ExecuteQueryModel();