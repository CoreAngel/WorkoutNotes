import { genSaltSync, hashSync, compareSync } from 'bcrypt';

class Crypto {
    private static saltRounds: number = 10;

    public static generateSalt = async (): Promise<string> => {
        return genSaltSync(Crypto.saltRounds);
    };

    public static hashPassword = async (password: string): Promise<string> => {
        const salt = await Crypto.generateSalt();
        return hashSync(password, salt);
    };

    public static comparePassword = async (password: string, hash: string): Promise<boolean> => {
        return compareSync(password, hash);
    };
}
