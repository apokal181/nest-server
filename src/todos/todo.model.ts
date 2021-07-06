import * as mongoose from 'mongoose'
import {timestamp} from "rxjs/operators";

export const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    done: {type: Boolean, required: true},
    important: {type: Boolean, required: true},
    // owner: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
    owner: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: {createdAt: 'created_at'}, versionKey: false});


export interface Product extends mongoose.Document {
    id: string,
    title: string,
    done: boolean,
    important: boolean,
    owner: mongoose.Types.ObjectId
}