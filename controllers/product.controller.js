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
        // const {title,description,stock_quantity}=req.body;
        let product = await ProductModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        // if (!product) return res.status(400).json({ msg: 'product not found' });
        res.status(201).json({ msg: 'product added success', product })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
}

module.exports = { addProduct, getAllProducts, getProductById, updateProductById}