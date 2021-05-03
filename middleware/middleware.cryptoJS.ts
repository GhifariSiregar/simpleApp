import CryptoJS from "crypto-js";

export class PasswordManagement {

    async decrypt(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {

                //DECRYPT PASSWORD BY ITS SALT
                let bytes  = CryptoJS.AES.decrypt(password, '23(fd*3&!');
                let originalText = bytes.toString(CryptoJS.enc.Utf8);

                resolve(originalText);
            }
            catch(err) {
                console.log(err);
                reject("error");
            }
        })
    }

    async encrypt(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                //PASSWORD HASHING
                let hashedPassword = CryptoJS.AES.encrypt(password, '23(fd*3&!').toString();

                resolve(hashedPassword);
            }
            catch(err) {
                console.log(err);
                reject("error");
            }
        })
    }

    async isWeak(password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {

                //PASSWORD STRENGTH CONSTRAINT
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumbers = /\d/.test(password);
                const hasNonalphas = /\W/.test(password);

                if(password.length < 8 || 
                    !hasLowerCase ||
                    !hasUpperCase ||
                    !hasNumbers ||
                    !hasNonalphas) {
                    
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
            catch(err) {
                console.log(err);
                resolve(true);
            }
        })
    }
}

export const passwordManagement = new PasswordManagement();