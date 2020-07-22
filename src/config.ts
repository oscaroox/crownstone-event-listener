import dotenv from 'dotenv';
import path from 'path';
import { SmartHomeJwt } from 'actions-on-google';

dotenv.config({ path: path.join(__dirname, '..', '.env') });
let jwt: SmartHomeJwt | undefined;

try {
    // Hardcoded string
    jwt = require('../private/google_service_key.json');
} catch (error) {
    const err = new Error('Error requiring google service key');
    throw err;
}

export const config = {
    SERVER_PORT: (process.env.SERVER_PORT as unknown) as number,
    DB_URL: process.env.DB_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    CROWNSTONE_CLOUD_URL: process.env.CROWNSTONE_CLOUD_URL,
    CROWNSTONE_EVENTS_URL: process.env.CROWNSTONE_EVENTS_URL,
    GOOGLE_SERVICE_KEY: jwt as SmartHomeJwt,
};
