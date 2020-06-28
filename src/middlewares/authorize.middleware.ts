import express from 'express';
import * as jwt from '../utils/jwt';
export function authorize(): express.RequestHandler {
    return async (req, res, next) => {
        const headerToken = req.headers.authorization?.split(' ')[1];
        const queryToken = req.query.token as string;

        const token = queryToken || headerToken;

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized access, invalid token',
            });
        }

        // TODO save decoded data in req object
        const decoded = await jwt.validateToken(token);

        next();
    };
}
