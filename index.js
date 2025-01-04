import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import pvkRouter from "./routes/pvk.js"
import diamondRouter from "./routes/diamond.js"
import saleRouter from "./routes/sales.js"
import settingsRouter from "./routes/settings.js"
import reviewRouter from "./routes/review.js"
import cors from "cors"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

const __dirname = path.resolve();


const app = express();

app.use(cors({
    origin: "https://jdmmoments.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/images", express.static(path.join(__dirname, "/images")))
app.use("/jdm/api/v1/auth", authRouter)
app.use("/jdm/api/v1/user", userRouter)
app.use("/jdm/api/v1/pvk", pvkRouter)
app.use("/jdm/api/v1/diamond", diamondRouter)
app.use("/jdm/api/v1/sale", saleRouter)
app.use("/jdm/api/v1/settings", settingsRouter)
app.use("/jdm/api/v1/review", reviewRouter)


const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "JDMDatabase" });
        console.log("JDMDatabase has been connected successfully with JDM Server 🎇❤")
    } catch (error) {
        console.log(error)
    }
}


// File Upload routes
const pvk_storage = multer.diskStorage({
    destination: (req, res, fn) => {
        fn(null, "images")
    },
    filename: (req, res, fn) => {

        // fn(null, req.body.image)
        fn(null, "m-logo.png")
    }
})

const pvk_upload = multer({ storage: pvk_storage })


const config = cloudinary;

config.config({
    cloud_name: process.env.CR_NAME,
    api_key: process.env.CR_KEY,
    api_secret: process.env.CR_SECRET,
    secure: true
})

app.post("/jdm/api/v1/upload", pvk_upload.single("file"), (req, res) => {
    config.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                success: false,
                message: err
            })
        } else {
            res.status(200).json({
                success: true,
                message: result
            })
        }
    })
})



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        response: "You are at JDMMoments Backend, App Running Securely",
    })
})


app.listen(8000, () => {
    ConnectDb();
    console.log("App is running on port 8000")
})