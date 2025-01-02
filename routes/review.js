import express from "express"
import { Review } from "../models/Review.js";



const router = express.Router();


router.post("/post-review/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { username, desc, rating } = req.body
        const reviewcreate = await Review.create({
            username,
            desc,
            email,
            rating,
        })
        res.status(201).json({
            success: true,
            response: "Review Has been added, Thank your for your response",
            data: reviewcreate
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message
        })
    }
})




router.get('/get-reviews', async (req, res) => {
    try {
        const get_reviews = await Review.find();
        res.status(200).json({
            success: true,
            response: get_reviews
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message
        })
    }
})




router.delete('/delete-review/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const delete_review = await Review.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            response: "Review has been Deleted",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message
        })
    }
})




export default router