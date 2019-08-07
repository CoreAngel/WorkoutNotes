const jwt = require('jsonwebtoken');

const generateToken = async (id) => {
    const PRIVATE_KEY = process.env.JWT;
    const data = {
        userId: id,
        date: new Date(),
    };
    return jwt.sign(data, PRIVATE_KEY);
};

const verifyToken = async (token) => {
    const PRIVATE_KEY = process.env.JWT;
    try {
        return jwt.verify(token, PRIVATE_KEY);
    } catch (e) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
