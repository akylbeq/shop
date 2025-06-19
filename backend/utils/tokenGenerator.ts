import jwt from 'jsonwebtoken';
require('dotenv').config();

export const generateAccessToken = (id: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Invalid JWT');
    }
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: '30m',
    });
}
export const generateRefreshToken = (id: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Invalid JWT');
    }
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}