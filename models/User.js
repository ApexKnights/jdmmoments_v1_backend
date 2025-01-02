import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    dp: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "Customer"
    },
    verify: {
        type: Boolean,
        default: false,
    },
    products: {
        type: Array,
        default: []
    }
}, { timestamps: true })


export const User = mongoose.model("User", usersSchema)