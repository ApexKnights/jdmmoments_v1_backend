import mongoose from "mongoose";

const DiamondSchema = new mongoose.Schema({
    catname: {
        type: String,
        required: true,
    },
    catimg: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: [],
    },
    price: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true })


export const Diamond = mongoose.model("Diamond", DiamondSchema)