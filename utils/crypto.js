const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const generateSalt = async () => {
    return bcrypt.genSaltSync(SALT_ROUNDS);
};

const hashPassword = async (password) => {
    const salt = await generateSalt();
    return bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = {
    generateSalt,
    hashPassword,
    comparePassword,
};
