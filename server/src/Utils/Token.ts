import { sign, verify } from 'jsonwebtoken';

export type TokenPayload = {
    id: string;
    key: string;
    iat: number;
};

export class Token {
    public static generate = async (
        id: string,
        key: string
    ): Promise<string> => {
        const privateKey: string = process.env.JWT || '';

        const data = {
            id,
            key
        };
        return sign(data, privateKey);
    };

    public static verify = async (
        token: string
    ): Promise<TokenPayload | null> => {
        try {
            const privateKey: string = process.env.JWT || '';
            return verify(token, privateKey) as TokenPayload;
        } catch (e) {
            return null;
        }
    };
}
