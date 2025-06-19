import mongoose, {HydratedDocument, Model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import {User} from "../types";

interface UserMethods {
    comparePassword: (password: string) => Promise<boolean>;
}

type UserModel = Model<User, {}, UserMethods>

const UserSchema = new Schema<HydratedDocument<User>, UserModel, UserMethods>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActiveAt: {
        type: Date,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'customer'],
        default: 'seller',
    }
});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (password: string) {
    return await  bcrypt.compare(password, this.password);
}

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
    }
});

const User = mongoose.model('User', UserSchema);
export default User;