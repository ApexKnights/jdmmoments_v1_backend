import mongoose, { Schema } from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: {
        type: String,
        required: true,
    }
}, { timestamps: true })


export const Token = mongoose.model("Token", TokenSchema)