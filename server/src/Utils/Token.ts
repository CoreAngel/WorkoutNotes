import { sign, verify } from 'jsonwebtoken'

export class Token {
    public static generate = async (id: string): Promise<string> => {
        const privateKey: string = process.env.JWT || '';

        const data = {
            userId: id,
            date: new Date(),
        };
        return sign(data, privateKey);
    };

    public static verify = async (token: string): Promise<string | object> => {
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
