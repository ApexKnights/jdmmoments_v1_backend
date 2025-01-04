import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { sendCookie } from "../utils/cookie.js";
import { IsAuthenticated } from "../auth/authenticate.js";
import { Token } from "../models/Token.js";
import { v4 as uuidv4 } from "uuid"
import { sendEmail } from "../utils/verifyemail.js";


const router = express.Router();


// *Register A User
router.post("/register", async (req, res) => {
    try {
        const { dp, username, email, mobile, password } = req.body;
        let createuser = await User.findOne({ email })
        if (createuser) {
            res.status(400).json({
                success: false,
                message: "User Already Exsists"
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            const encryptedpassword = await bcrypt.hashSync(password, salt);
            createuser = await User.create({
                username,
                email,
                mobile,
                dp,
                password: encryptedpassword,
            })
            const presentuser = await User.findOne({ email })
            // todo: Send Email verification 
            sendCookie(createuser, res, "User Resgistered Successfully", presentuser._id, 201)
        }
    } catch (error) {
        console.log(error)
    }
})




//? Email Verification
router.post("/verify/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        const token = await Token.create({
            userId: user._id,
            token: uuidv4().toString("hex"),
        })
        const url = `${process.env.FRONTEND_URL}/#/success/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Your Email", url)
        res.status(201).json({
            success: true,
            response: "Email has been sent to mail addrss, please verify"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: "something went wrong"
        })
        console.log(error)
    }
})

router.get("/:id/email-confirm/:token", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid Link" })
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        if (!token) return res.status(400).send({ message: "Invalid Token" })
        await user.updateOne({ verify: true });
        await token.deleteOne({
            userId: user._id,
        })
        res.status(200).json({
            success: true,
            response: "Congratulations, Email has been successfully verified"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: "Something Went Wrong",
        })
        console.log(error)
    }
})


// * Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                success: false,
                response: "User Doesn't Exists"
            })
        } else {
            const decrypt = await bcrypt.compareSync(password, user.password);
            if (!decrypt) {
                res.status(401).json({
                    success: false,
                    response: "Sorry invalid credentials, try again"
                })
            } else {
                sendCookie(user, res, "User Logged In Successfully", user._id, 200)
            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            response: "Something Went Wrong",
            err: error,
        })
        console.log(error)
    }
})


//* Refetch- Getting looged user details
router.get("/refetch", IsAuthenticated, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })


})

// ! Logout Route
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json({ message: "Logged Out Successfully" })
    } catch (error) {
        res.status(500).json(error)
    }

})




export default router