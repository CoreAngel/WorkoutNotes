const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 36
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 256
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
