import express from "express"
import { IsAuthenticated } from "../auth/authenticate.js";
import { PVK } from "../models/PVK.js";
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();



// *** Category add ***
router.post('/add-category', IsAuthenticated, async (req, res) => {
    const { catname, catimg, price } = req.body;
    try {
        const newcategory = await PVK.create({
            catname,
            catimg,
            products: [],
            price,
        })
        res.status(200).json({
            success: true,
            response: `${catname}, has been successfully added`,
            data: newcategory,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})

// *** Product add (Updating selected categories with new products)
router.put('/add-product/:catname', IsAuthenticated, async (req, res) => {
    const categoryName = req.params.catname;
    const id = uuidv4();
    const { prodimg, prodname, free } = req.body
    try {
        const updatedCategory = await PVK.findOneAndUpdate({ catname: categoryName }, {
            $push: {
                products: {
                    id,
                    prodimg,
                    prodname,
                    free,
                    buy: "none",
                }
            }
        }, { new: true })
        if (!updatedCategory) {
            return res.status(404).json({ message: "Sorry, Category not found" })
        } else {
            res.status(200).json({
                success: true,
                message: "Category has updated successfully, and product added",
                category: updatedCategory,
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        })
    }
})


// *** Categories fetch route

router.get('/get-categories', async (req, res) => {
    try {
        const category = await PVK.find();
        res.status(200).json({
            success: true,
            response: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }

})


// !Delete Category
router.delete('/delete-category/:catname', async (req, res) => {
    const { catname } = req.params;
    try {
        const deleteCategory = await PVK.findOneAndDelete({ catname: catname });
        res.status(200).json({
            succes: true,
            message: "Category has been deleted"
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            error: error,
        })
        console.log(error)
    }
})


// !delete Product
router.delete('/delete-product/:catname', async (req, res) => {
    const { catname } = req.params;
    const { id } = req.query;

    try {
        const updateCategory = await PVK.findOneAndUpdate({ catname: catname }, {
            $pull: { products: { id } }
        }, { new: true });
        res.status(200).json({
            success: true,
            message: "Product has been successfully deleted",
            data: updateCategory,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error
        })
    }
})


//* update category (Price)

router.put('/update-price/:catname', async (req, res) => {
    const { catname } = req.params;
    const { price } = req.body;

    try {
        const updateprice = await PVK.findOneAndUpdate({ catname: catname }, {
            $set: { price: price }
        }, { new: true })
        res.status(200).json({
            success: true,
            message: "Category price Changed",
            data: updateprice,
        })
    } catch (error) {

    }
})
router.put('/update-catname/:catname', async (req, res) => {
    const { catname } = req.params;
    const { newcatname } = req.body;

    try {
        const updateprice = await PVK.findOneAndUpdate({ catname: catname }, {
            $set: { catname: newcatname }
        }, { new: true })
        res.status(200).json({
            success: true,
            message: "Category Name Changed",
            data: updateprice,
        })
    } catch (error) {

    }
})



export default router