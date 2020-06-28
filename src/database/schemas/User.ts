import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface User extends Document {
    accessToken: string;
}

export const UserSchema = new Schema<User>({
    _id: String,
    accessToken: { type: String },
});
