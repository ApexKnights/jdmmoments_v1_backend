import express from "express"
import { User } from "../models/User.js";
import bcrypt from "bcrypt"
import { IsAuthenticated } from "../auth/authenticate.js";

const router = express.Router();




// TODO: Edit  Users
router.put("/userupdate-password/:id", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedpassword = await bcrypt.hashSync(password, salt);
        const userpass_update = await User.findByIdAndUpdate({ _id: id }, {
            $set: { password: encryptedpassword }
        })
        res.status(200).json({
            success: true,
            response: "Successfully updated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: "something went wrong"
        })
        console.log(error)
    }
})

// TODO: Delete Users
router.delete("/userdelete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deluser = await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            response: "Successfully Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: "something went wrong"
        })
    }

})

//*** Get Users

router.get("/get-users", async (req, res) => {
    try {
        const allusers = await User.find();
        res.status(200).json({
            success: true,
            response: allusers
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: "something went wrong"
        })
    }
})


// **** Make Admin

router.put("/make-admin/:id/:adminid", async (req, res) => {
    const id = req.params.id
    const adminid = req.params.adminid
    try {
        const user = await User.findById({ _id: adminid })
        if (user.type !== "Admin") {
            res.status(500).json({
                success: false,
                response: "Sorry You Dont have right credentials to make this changes"
            })
        } else {
            const makeadmin = await User.findByIdAndUpdate({ _id: id }, {
                $set: { type: "Admin" }
            }, { new: true })
            res.status(200).json({
                success: true,
                response: "Successfully updated as Admin",
                data: makeadmin,
            })
        }

    } catch (error) {
        res.status(500).json({
            success: true,
            response: error,
        })
    }
})












export default router