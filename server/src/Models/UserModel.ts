import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
    login: string;
    email: string;
    password: string;
    token: string;
    created: Date;
    lastLogin: Date;
}

const userSchema: Schema<User> = new Schema<User>({
    login: {
        type: String,
        required: true,
        unique: true,
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

export const UserModel = model<User>('User', userSchema);
