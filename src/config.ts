import dotenv from 'dotenv';
import path from 'path';
import { SmartHomeJwt } from 'actions-on-google';

dotenv.config({ path: path.join(__dirname, '..', '.env') });
let jwt: SmartHomeJwt | undefined;

try {
    // Hardcoded string
    jwt = require('../google_service_key.json');
} catch (error) {
    const err = new Error('Error requiring google service key');
    throw err;
}

export const config = {
    SERVER_PORT: (process.env.SERVER_PORT as unknown) as number,
    DB_URL: process.env.DB_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    LAMBDA_URL: process.env.LAMBDA_URL,
    API_GATEWAY_KEY: process.env.API_GATEWAY_KEY,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'gXnveyUBtYFoVOzOfBi1y9U7RD7r5cAQJ4zi03KRx44HmBunjAOMvDgaJOyIvKEX',
    CROWNSTONE_CLOUD_URL: process.env.CROWNSTONE_CLOUD_URL,
    CROWNSTONE_EVENTS_URL: process.env.CROWNSTONE_EVENTS_URL,
    GOOGLE_SERVICE_KEY: jwt as SmartHomeJwt,
};
