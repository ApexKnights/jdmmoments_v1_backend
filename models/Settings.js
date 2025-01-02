import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
    },
    color: {
        type: String,
        required: true,
    },
    color2: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true
    },
    aboutimg: {
        type: String,
        default: ""
    },
    heroimg: {
        type: String,
        default: ""
    }

}, { timestamps: true })


export const Settings = mongoose.model("Settings", settingsSchema)