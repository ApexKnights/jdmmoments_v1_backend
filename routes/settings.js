import express from "express"
import { Settings } from "../models/Settings.js";

const router = express.Router();


router.post("/change-settings", async (req, res) => {
    try {
        const { about, heading, color, color2, logo } = req.body;
        const createSettings = await Settings.create({
            about,
            heading,
            color,
            color2,
            logo
        })
        res.status(201).json({
            success: true,
            response: createSettings
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})

router.get("/get-settings", async (req, res) => {
    try {
        const settings = await Settings.find();
        res.status(200).json({
            success: true,
            response: settings
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})


router.put("/update-texts/:id", async (req, res) => {
    const { about, heading } = req.body;
    try {

        const update_text = await Settings.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                about: about,
                heading: heading
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: update_text
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})

router.put("/update-color/:id", async (req, res) => {
    const { color, color2 } = req.body;
    try {

        const update_color = await Settings.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                color: color,
                color2: color2
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: update_color
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})

router.put("/update-logo/:id", async (req, res) => {
    const { logo } = req.body;
    try {

        const update_logo = await Settings.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                logo: logo
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: update_logo
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})


router.put("/about-img/:id", async (req, res) => {
    const { aboutimg } = req.body;
    try {

        const about_img = await Settings.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                aboutimg: aboutimg
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: about_img
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})

router.put("/hero-img/:id", async (req, res) => {
    const { heroimg } = req.body;
    try {

        const hero_img = await Settings.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                heroimg: heroimg
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: hero_img
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})




export default router