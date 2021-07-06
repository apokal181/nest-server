import mongoose from "mongoose";

export interface User extends mongoose.Document {
    readonly email: string,
    readonly password: string
}