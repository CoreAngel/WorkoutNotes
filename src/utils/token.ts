import { sign, verify,  } from 'jsonwebtoken'

class Token {

    public static generateToken = async (id: string): Promise<string> => {
        const privateKey: string = process.env.JWT || '';

        const data = {
            userId: id,
            date: new Date(),
        };
        return sign(data, privateKey);
    };

    public static verifyToken = async (token: string): Promise<string | object> => {
        const privateKey: string = process.env.JWT || '';

        return new Promise<string | object>((resolve, reject) => {
            try {
                resolve(verify(token, privateKey));
            } catch (e) {
                reject(e);
            }
        });

    };

}
