import express from "express"
import { Sales } from "../models/Sales.js";
import { User } from "../models/User.js";
import { PVK } from "../models/PVK.js";
import { Diamond } from "../models/Diamond.js";
import { IsAuthenticated } from "../auth/authenticate.js";

const router = express.Router();


// Todo : Sale Initiation

router.post('/initiate-sale', async (req, res) => {
    try {
        // Todo : Initiate the sale with the product to be sold
        const { prodname, prodimg, price, soldto, group } = req.body;

        const createSale = await Sales.create({
            prodname,
            prodimg,
            price,
            soldto,
            group
        })
        // Todo: Add the prod image+name in user schema
        await User.findOneAndUpdate({ email: soldto }, {
            $push: {
                products: {
                    prodname,
                    prodimg
                }
            }
        })
        res.status(200).json({
            success: true,
            response: "Sale has been added"
        })


    } catch (error) {
        res.status(500).json({
            success: false
        })
        console.log(error)
    }
})


// Todo: Updating the PVK -product buy option
router.put('/pvk/update-buy/:catname', async (req, res) => {
    const { catname } = req.params; // Category name from the URL
    const { productId, buy } = req.body; // Product ID and the new value for 'buy'

    try {
        const updatedCategory = await PVK.findOneAndUpdate(
            { catname, "products.id": productId }, // Match the category and product ID
            { $set: { "products.$.buy": buy } }, // Update the 'buy' property of the matched product
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Product not found in the category",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedCategory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
            error: error.message,
        });
    }
});

// Todo: Updating the Diamond -product buy option
router.put('/diamond/update-buy/:catname', async (req, res) => {
    const { catname } = req.params; // Category name from the URL
    const { productId, buy } = req.body; // Product ID and the new value for 'buy'

    try {
        const updatedCategory = await Diamond.findOneAndUpdate(
            { catname, "products.id": productId }, // Match the category and product ID
            { $set: { "products.$.buy": buy } }, // Update the 'buy' property of the matched product
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Product not found in the category",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedCategory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
            error: error.message,
        });
    }
});

router.get('/get-sales', IsAuthenticated, async (req, res) => {
    try {
        const sales = await Sales.find();
        res.status(200).json({
            success: true,
            response: sales
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})


// Todo: fetch products sold for the particular customer
router.get('/products/:email', IsAuthenticated, async (req, res) => {
    try {
        const user_products = await Sales.find({ soldto: req.params.email });
        if (!user_products) {
            res.status(500).json({
                success: false,
                response: "Sorry No  Products are associated with this email"
            })
        }
        res.status(200).json({
            success: true,
            response: user_products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})


export default router