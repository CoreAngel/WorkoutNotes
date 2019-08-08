const userModel = require('./../models/user');
const validateRegister = require('./../validations/register');
const { hashPassword } = require('./../utils/crypto');
const { generateToken } = require('./../utils/token');

const registerController = async (req, res) => {
    const {error, value} = validateRegister(req.body);

    if(error !== null) {
        return res.send({
            status: 'Error',
            type: 'validation',
            data: error
        }).end();
    }

    const { login, email, password } = value;
    const data = await userModel.findOne({login});

    if(data !== null) {
        return res.send({
            status: 'Error',
            type: 'validation',
            data: ['Login exists!']
        }).end();
    }
    const hashedPassword = await hashPassword(password);

    const user = new userModel({
        login,
        email,
        password: hashedPassword
    });

    try {
        const data = await user.save();
        const userId = data._id;
        const generatedToken = await generateToken(userId);
        const { nModified } = await user.updateOne({token: generatedToken});

        if (nModified !== 1) {
            return res.status(503).end();
        }

        return res.send({
            status: 'OK',
            token: generatedToken
        }).end();
    } catch (e) {
        return res.status(503).end();
    }
};

module.exports = registerController;
