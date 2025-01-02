import mongoose from "mongoose";

const PvkSchema = new mongoose.Schema({
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


export const PVK = mongoose.model("PVK", PvkSchema)