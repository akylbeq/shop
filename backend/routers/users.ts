import express from 'express';
import User from '../models/User';
import Session from '../models/Session';
import {generateAccessToken, generateRefreshToken} from "../utils/tokenGenerator";
import auth, {Req} from "../middlewares/auth";
import jwt from "jsonwebtoken";


const usersRouter = express.Router();

usersRouter.post('/signup', async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            res.status(400).json({ ok: false, message: 'Заполните все поля' });
            return;
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({ ok: false, message: `${email} уже зарегистрирован` });
            return;
        }

        const user = new User({ name, email, phone, password });
        await user.save();

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        await Session.create({
            user: user._id,
            refreshToken,
            deviceInfo: req.headers['user-agent'] || 'unknown',
        });

        res.status(200).json({
            ok: true,
            user,
            token: { accessToken, refreshToken },
        });
    } catch (err) {
        next(err);
    }
});

usersRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ ok: false, message: 'Заполните все поля' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ ok: false, message: 'Почта не зарегистрирована' });
            return;
        }

        const isValid = await user.comparePassword(password);
        if (!isValid) {
            res.status(400).json({ ok: false, message: 'Неверный пароль' });
            return;
        }

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        await Session.create({
            user: user._id,
            refreshToken,
            deviceInfo: req.headers['user-agent'] || 'unknown',
        });

        res.status(200).json({
            ok: true,
            user,
            token: { accessToken, refreshToken },
        });
    } catch (err) {
        next(err);
    }
});

usersRouter.post('/session', async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            res.status(400).json({ ok: false, message: "Refresh token not provided"});
            return;
        }

        if (!process.env.JWT_SECRET) {
            res.status(401).json({ ok: false, message: "Key not provided" });
            return;
        }
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_SECRET) as {id: string};
        } catch (err) {
            res.status(401).json({ ok: false, message: "Invalid or expired refresh token" });
            return;
        }
        const session = await Session.findOne({refreshToken});
        if (!session) {
            res.status(401).json({ ok: false, message: "Session not found" });
            return;
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(404).json({ok: false, message: "User not found"});
            return;
        }

        const accessToken = generateAccessToken(user._id)

        res.status(200).json({
            ok: true,
            user,
            token: {
                refreshToken,
                accessToken
            }
        })
    } catch (err) {
        next();
    }
})

export default usersRouter;