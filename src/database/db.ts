import mongoose from 'mongoose';
import { config } from '../config';
import { UserSchema, User } from './schemas/User';

export async function createConnection() {
    const conn = await mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const models = {
        User: conn.model<User>('User', UserSchema),
    };

    return { conn, models };
}
