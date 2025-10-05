const ProductModel = require("../models/product.model");

const addProduct = async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json({ msg: 'product added success', product })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(201).json({ msg: 'product added success', products })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log('productId >> ',id)
        const product = await ProductModel.findById(id);
        res.status(201).json({ msg: 'product added success', product })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
}

const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        // When updating a product, the stock_quantity cannot go below zero.
        
        let product = await ProductModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(201).json({ msg: 'product added success', product })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        let product = await ProductModel.findByIdAndDelete(id);
        res.status(201).json({ msg: 'product added success', product })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
}


const decStockQty = async (req, res) => {
    try {
        const { id } = req.params;
        let product = await ProductModel.findById(id);
        // check if stock qty is not zero
        if (product.stock_quantity === 0) return res.status(400).json({ msg: "stock qty can't go below zero" });
        product.stock_quantity -= 1;
        await product.save();
        res.status(201).json({ msg: 'stock qty decreased', product })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
}

const incStockQty = async (req, res) => {
    try {
        const { id } = req.params;
        let product = await ProductModel.findById(id);
        product.stock_quantity += 1;
        await product.save();
        res.status(201).json({ msg: 'stock qty increased', product })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    decStockQty,
    incStockQty
}