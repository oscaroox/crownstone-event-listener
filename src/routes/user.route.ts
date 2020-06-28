import express from 'express';
import { validate } from '../middlewares/validate.middleware';
import { body } from 'express-validator';
import { addListener, removeListener } from '../listeners';
import { Types } from 'mongoose';
const router = express.Router();

router.post(
    '/',
    validate([
        body('userId')
            .notEmpty()
            .isString(),
        body('accessToken')
            .isString()
            .notEmpty(),
    ]),
    async (req, res) => {
        const { User } = req.db.models;

        const exists = await User.findById(req.body.userId);

        if (exists) {
            exists.accessToken = req.body.accessToken;

            await exists.save();
            removeListener(exists._id);
            addListener(exists);
            return res.status(200).json({ message: 'ok' });
        }
        console.log(req.body);
        const user = new User({
            _id: req.body.userId,
            accessToken: req.body.accessToken,
        });

        await user.save();

        addListener(user);
        res.status(200).json({ message: 'ok' });
    },
);

router.post(
    '/disconnect',
    validate([
        body('userId')
            .notEmpty()
            .isString(),
    ]),
    async (req, res) => {
        const { User } = req.db.models;

        const exists = await User.findById(req.body.userId);

        if (exists) {
            await exists.remove();
            removeListener(exists._id);
        }
        res.status(200).json({ message: 'ok' });
    },
);
export const UserRouter = router;
