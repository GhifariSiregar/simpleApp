import jwt from "jsonwebtoken";

export class TokenManagement {

    async signToken(id: string, email: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign({id: id, email: email}, "!#shad321.", { expiresIn: 60 * 60 }, function(err: any, token: any) {
                if(err) {
                    console.log(err);
                    reject(err.message);
                }
                else {
                    resolve(token);
                }
            })
        })
    }

    async verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, "!#shad321.", function(err: any, decoded: any) {
                if(err) {
                    reject(err.message);
                }
                else {
                    resolve(decoded);
                }
            })
        })
    }
}

export const tokenManagement: TokenManagement = new TokenManagement();