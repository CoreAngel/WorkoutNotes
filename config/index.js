const dotenv = require('dotenv');
const mongoose = require('mongoose');

const dotenvConfig = () => {
    dotenv.config();
};

const mongooseConfig = () => {
    mongoose.connect(
        process.env.MONGODB,
        { useNewUrlParser: true },
        () => console.log('connect to db')
    );
};

module.exports = () => {
    dotenvConfig();
    mongooseConfig();
};
