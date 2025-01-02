import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    prodname: {
        type: String,
        required: true,
    },
    prodimg: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    soldto: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const Sales = mongoose.model("Sale", saleSchema)