const express = require('express');
const ProductModel = require('../models/product.model');

const productRouter = express.Router();

productRouter.post('/', async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json({ msg: 'product added success', product })
    } catch (err) {
        console.log('Error : ', err);
        res.status(500).json({ msg: "something went bad" })
    }
})

module.exports = productRouter;