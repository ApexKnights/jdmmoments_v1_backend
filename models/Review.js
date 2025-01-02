import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    username: {
        type: "String",
        required: true
    },
    desc: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const Review = mongoose.model("Review", ReviewSchema)