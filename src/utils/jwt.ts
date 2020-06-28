import jwt from 'jsonwebtoken';
import { config } from '../config';

export function generateToken(payload: {}) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.JWT_SECRET, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
}

export function validateToken(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }

            resolve(decoded);
        });
    });
}
